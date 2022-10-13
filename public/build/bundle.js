
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.50.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function pricify$1(x) {
        return x.toLocaleString('pt-br', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const data$2 = [
    	  	{
                name: 'Lacre',
                price: 150,
                amount: 30,
                points: 6200,
            },
            {
                name: 'Arroz',
                price: 17,
                amount: 5,
                points: 75,
            },
            {
                name: 'Feijão',
                price: 6,
                amount: 1,
                points: 15,
            },
            {
                name:'Leite',
                price: 7,
                amount: 1,
                points: 10,
            },
            {
                name: 'Óleo',
                price: 8,
                amount: 1,
                points: 10,
            },
            {
                name: 'Macarrão',
                price: 8,
                amount: 2,
                points: 10,
            },
    		{
    			name: 'Brinquedos',
                price: 10,
                amount: 1,
                points: 10,
    		}
    ];

    const comparisons = writable(data$2);

    /* src\components\Price.svelte generated by Svelte v3.50.1 */
    const file$3 = "src\\components\\Price.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i].name;
    	child_ctx[9] = list[i].price;
    	child_ctx[10] = list[i].amount;
    	child_ctx[11] = list[i].points;
    	return child_ctx;
    }

    // (92:5) {#each table as { name, price, amount, points }}
    function create_each_block$3(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*name*/ ctx[8] + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = pricify$1(/*price*/ ctx[9]) + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*amount*/ ctx[10] + "";
    	let t4;
    	let t5;
    	let td3;
    	let t6_value = /*points*/ ctx[11] + "";
    	let t6;
    	let t7;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			attr_dev(td0, "class", "svelte-15zvcps");
    			add_location(td0, file$3, 93, 7, 2469);
    			attr_dev(td1, "class", "svelte-15zvcps");
    			add_location(td1, file$3, 94, 7, 2493);
    			attr_dev(td2, "class", "svelte-15zvcps");
    			add_location(td2, file$3, 95, 7, 2529);
    			attr_dev(td3, "class", "svelte-15zvcps");
    			add_location(td3, file$3, 96, 7, 2555);
    			add_location(tr, file$3, 92, 6, 2456);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, t6);
    			append_dev(tr, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*table*/ 1 && t0_value !== (t0_value = /*name*/ ctx[8] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*table*/ 1 && t2_value !== (t2_value = pricify$1(/*price*/ ctx[9]) + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*table*/ 1 && t4_value !== (t4_value = /*amount*/ ctx[10] + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*table*/ 1 && t6_value !== (t6_value = /*points*/ ctx[11] + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(92:5) {#each table as { name, price, amount, points }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let option3;
    	let t8;
    	let input;
    	let t9;
    	let table_1;
    	let tr;
    	let th0;
    	let t11;
    	let th1;
    	let t13;
    	let th2;
    	let t15;
    	let th3;
    	let t17;
    	let mounted;
    	let dispose;
    	let each_value = /*table*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Comparador";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Aqui você pode alterar os valores e fazer as comparações necessárias";
    			t3 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Padrão";
    			option1 = element("option");
    			option1.textContent = "Preço";
    			option2 = element("option");
    			option2.textContent = "Quantidade";
    			option3 = element("option");
    			option3.textContent = "Pontos";
    			t8 = space();
    			input = element("input");
    			t9 = space();
    			table_1 = element("table");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "Nome";
    			t11 = space();
    			th1 = element("th");
    			th1.textContent = "Preço";
    			t13 = space();
    			th2 = element("th");
    			th2.textContent = "Quantidade";
    			t15 = space();
    			th3 = element("th");
    			th3.textContent = "Pontos";
    			t17 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h1, file$3, 72, 4, 1840);
    			add_location(p, file$3, 73, 4, 1865);
    			option0.__value = "default";
    			option0.value = option0.__value;
    			add_location(option0, file$3, 76, 5, 2005);
    			option1.__value = "price";
    			option1.value = option1.__value;
    			add_location(option1, file$3, 77, 5, 2049);
    			option2.__value = "amount";
    			option2.value = option2.__value;
    			add_location(option2, file$3, 78, 5, 2090);
    			option3.__value = "points";
    			option3.value = option3.__value;
    			add_location(option3, file$3, 79, 5, 2137);
    			if (/*type*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[4].call(select));
    			add_location(select, file$3, 75, 4, 1948);
    			attr_dev(input, "type", "number");
    			add_location(input, file$3, 82, 4, 2200);
    			attr_dev(th0, "class", "svelte-15zvcps");
    			add_location(th0, file$3, 86, 6, 2295);
    			attr_dev(th1, "class", "svelte-15zvcps");
    			add_location(th1, file$3, 87, 6, 2316);
    			attr_dev(th2, "class", "svelte-15zvcps");
    			add_location(th2, file$3, 88, 6, 2338);
    			attr_dev(th3, "class", "svelte-15zvcps");
    			add_location(th3, file$3, 89, 6, 2366);
    			add_location(tr, file$3, 85, 5, 2283);
    			attr_dev(table_1, "class", "svelte-15zvcps");
    			add_location(table_1, file$3, 84, 4, 2269);
    			add_location(div, file$3, 71, 0, 1829);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(div, t3);
    			append_dev(div, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(select, option3);
    			select_option(select, /*type*/ ctx[1]);
    			append_dev(div, t8);
    			append_dev(div, input);
    			set_input_value(input, /*value*/ ctx[2]);
    			append_dev(div, t9);
    			append_dev(div, table_1);
    			append_dev(table_1, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t11);
    			append_dev(tr, th1);
    			append_dev(tr, t13);
    			append_dev(tr, th2);
    			append_dev(tr, t15);
    			append_dev(tr, th3);
    			append_dev(table_1, t17);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table_1, null);
    			}

    			if (!mounted) {
    				dispose = [
    					listen_dev(select, "change", /*select_change_handler*/ ctx[4]),
    					listen_dev(select, "change", /*handleInput*/ ctx[3], false, false, false),
    					listen_dev(input, "input", /*input_input_handler*/ ctx[5]),
    					listen_dev(input, "input", /*handleInput*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*type*/ 2) {
    				select_option(select, /*type*/ ctx[1]);
    			}

    			if (dirty & /*value*/ 4 && to_number(input.value) !== /*value*/ ctx[2]) {
    				set_input_value(input, /*value*/ ctx[2]);
    			}

    			if (dirty & /*table, pricify*/ 1) {
    				each_value = /*table*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(table_1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function adjustPrice(item, price) {
    	let { name } = item;
    	let amount = proportion(item.price, item.amount)(price).toFixed(0);
    	let points = proportion(item.price, item.points)(price).toFixed(0);
    	return { name, price, amount, points };
    }

    function adjustAmount(item, amount) {
    	let { name } = item;
    	let price = proportion(item.amount, item.price)(amount).toFixed(0);
    	let points = proportion(item.amount, item.points)(amount).toFixed(0);
    	return { name, price, amount, points };
    }

    function adjustPoints(item, points) {
    	let { name } = item;
    	let price = proportion(item.points, item.price)(points).toFixed(0);
    	let amount = proportion(item.points, item.amount)(points).toFixed(0);
    	return { name, price, amount, points };
    }

    function proportion(it, equals) {
    	return that => that * equals / it;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Price', slots, []);
    	let data;
    	let table;

    	comparisons.subscribe(comp => {
    		data = $$invalidate(0, table = comp);
    	});

    	let type = 'default';
    	let value = 0;

    	function handleInput() {
    		if (type == 'default') return $$invalidate(0, table = data);
    		if (value == 0 || value == null) return $$invalidate(0, table = data);
    		$$invalidate(0, table = queryData(type, value));
    	}

    	// --------------------------------------------- //
    	function queryData(type, value) {
    		const queryTable = {
    			'price': adjustPrice,
    			'amount': adjustAmount,
    			'points': adjustPoints
    		};

    		return data.map(item => queryTable[type](item, value));
    	}
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Price> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		type = select_value(this);
    		$$invalidate(1, type);
    	}

    	function input_input_handler() {
    		value = to_number(this.value);
    		$$invalidate(2, value);
    	}

    	$$self.$capture_state = () => ({
    		pricify: pricify$1,
    		comparisons,
    		data,
    		table,
    		type,
    		value,
    		handleInput,
    		queryData,
    		adjustPrice,
    		adjustAmount,
    		adjustPoints,
    		proportion
    	});

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) data = $$props.data;
    		if ('table' in $$props) $$invalidate(0, table = $$props.table);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [table, type, value, handleInput, select_change_handler, input_input_handler];
    }

    class Price extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Price",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const data$1 = [
        { 
            store: 'Requetelo',
            item: 'Bandeira',
            price: 100,
            amount: 1,
        },
        { 
            store: 'Santa Helena',
            item: 'Cano PVC',
            price: 12,
            amount: 1,
        },
        {
            store: 'Usadão Bady',
            item: 'Garrafas Pets',
            price: 0.3,
            amount: 80,
        },
        {
            store: 'Centro de Reciclagem',
            item: 'Lacres',
            price: 5,
            amount: 30
        },
        {
            store: 'Tema Print',
            item: 'Posters',
            price: 23,
            amount: 2
        },
        {
            store: 'Papelaria Central',
            item: 'Bilhetes',
            price: 18,
            amount: 1
        },
        {
            store: 'São Luís',
            item: 'Decorações',
            price: 10,
            amount: 1
        },
        {
            store: 'Tema Print',
            item: 'Emblema',
            price: 30,
            amount: 1
        },
        {
            store: 'Conveniência',
            item: 'Saco de lixo',
            price: 3.75,
            amount: 1
        },
        {
            store: 'Ebisu',
            item: 'Fita isolante',
            price: 10,
            amount: 2
        },
        {
            store: 'Cacau Show',
            item: 'Cesta da Rifa',
            price: 60,
            amount: 1
        },
    ];

    const expenses = writable(data$1);

    /* src\components\Expenses.svelte generated by Svelte v3.50.1 */
    const file$2 = "src\\components\\Expenses.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i].item;
    	child_ctx[3] = list[i].price;
    	child_ctx[4] = list[i].amount;
    	return child_ctx;
    }

    // (31:1) {#each table as { item, price, amount }}
    function create_each_block$2(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*item*/ ctx[2] + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = pricify$1(/*price*/ ctx[3]) + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = /*amount*/ ctx[4] + "";
    	let t4;
    	let t5;
    	let td3;
    	let t6_value = pricify$1(/*price*/ ctx[3] * /*amount*/ ctx[4]) + "";
    	let t6;
    	let t7;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td3 = element("td");
    			t6 = text(t6_value);
    			t7 = space();
    			attr_dev(td0, "class", "svelte-15zvcps");
    			add_location(td0, file$2, 32, 3, 562);
    			attr_dev(td1, "class", "svelte-15zvcps");
    			add_location(td1, file$2, 33, 3, 582);
    			attr_dev(td2, "class", "svelte-15zvcps");
    			add_location(td2, file$2, 34, 3, 614);
    			attr_dev(td3, "class", "svelte-15zvcps");
    			add_location(td3, file$2, 35, 12, 645);
    			add_location(tr, file$2, 31, 2, 553);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td3);
    			append_dev(td3, t6);
    			append_dev(tr, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*table*/ 1 && t0_value !== (t0_value = /*item*/ ctx[2] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*table*/ 1 && t2_value !== (t2_value = pricify$1(/*price*/ ctx[3]) + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*table*/ 1 && t4_value !== (t4_value = /*amount*/ ctx[4] + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*table*/ 1 && t6_value !== (t6_value = pricify$1(/*price*/ ctx[3] * /*amount*/ ctx[4]) + "")) set_data_dev(t6, t6_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(31:1) {#each table as { item, price, amount }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let t4;
    	let t5_value = pricify$1(/*total*/ ctx[1]) + "";
    	let t5;
    	let t6;
    	let table_1;
    	let tr;
    	let th0;
    	let t8;
    	let th1;
    	let t10;
    	let th2;
    	let t12;
    	let th3;
    	let t14;
    	let each_value = /*table*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Gastos";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Recibo de todos os gastos";
    			t3 = space();
    			p1 = element("p");
    			t4 = text("Total: ");
    			t5 = text(t5_value);
    			t6 = space();
    			table_1 = element("table");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "Item";
    			t8 = space();
    			th1 = element("th");
    			th1.textContent = "Preço";
    			t10 = space();
    			th2 = element("th");
    			th2.textContent = "Quantidade";
    			t12 = space();
    			th3 = element("th");
    			th3.textContent = "Total";
    			t14 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h1, file$2, 20, 0, 311);
    			add_location(p0, file$2, 21, 0, 328);
    			add_location(p1, file$2, 22, 0, 362);
    			attr_dev(th0, "class", "svelte-15zvcps");
    			add_location(th0, file$2, 25, 8, 420);
    			attr_dev(th1, "class", "svelte-15zvcps");
    			add_location(th1, file$2, 26, 2, 437);
    			attr_dev(th2, "class", "svelte-15zvcps");
    			add_location(th2, file$2, 27, 2, 455);
    			attr_dev(th3, "class", "svelte-15zvcps");
    			add_location(th3, file$2, 28, 8, 484);
    			add_location(tr, file$2, 24, 1, 406);
    			attr_dev(table_1, "class", "svelte-15zvcps");
    			add_location(table_1, file$2, 23, 0, 396);
    			add_location(div, file$2, 19, 0, 304);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p0);
    			append_dev(div, t3);
    			append_dev(div, p1);
    			append_dev(p1, t4);
    			append_dev(p1, t5);
    			append_dev(div, t6);
    			append_dev(div, table_1);
    			append_dev(table_1, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t8);
    			append_dev(tr, th1);
    			append_dev(tr, t10);
    			append_dev(tr, th2);
    			append_dev(tr, t12);
    			append_dev(tr, th3);
    			append_dev(table_1, t14);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table_1, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*total*/ 2 && t5_value !== (t5_value = pricify$1(/*total*/ ctx[1]) + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*pricify, table*/ 1) {
    				each_value = /*table*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(table_1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let total;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Expenses', slots, []);
    	let table;

    	expenses.subscribe(data => {
    		$$invalidate(0, table = data);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Expenses> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ pricify: pricify$1, expenses, table, total });

    	$$self.$inject_state = $$props => {
    		if ('table' in $$props) $$invalidate(0, table = $$props.table);
    		if ('total' in $$props) $$invalidate(1, total = $$props.total);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*table*/ 1) {
    			$$invalidate(1, total = table.reduce((acc, purchase) => acc += purchase.price * purchase.amount, 0));
    		}
    	};

    	return [table, total];
    }

    class Expenses extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Expenses",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    const data = [
        { name: 'MARIA NÍVEA 6° ANO', donation: 0 },
        { name: 'MATHEUS 6° ANO', donation: 15 },
        { name: 'MIGUEL 6° ANO', donation: 0 },
        { name: 'RAFAEL 6º ANO', donation: 0 },
        { name: 'VALENTINA 6° ANO', donation: 0 },
        { name: 'ISABELLE 6° ANO', donation: 20 },
        { name: 'AGATHA 7° ANO', donation: 20 },
        { name: 'BETHINA 7º ANO', donation: 20 },
        { name: 'ENZO 7° ANO', donation: 20 },
        { name: 'FELIPE 7º ANO', donation: 20 },
        { name: 'GABRIELLA 7° ANO', donation: 20 },
        { name: 'JOÃO MATEUS 7° ANO', donation: 30 },
        { name: 'WARLLEY 7° ANO', donation: 20 },
        { name: 'LUCAS 8º ANO', donation: 20 },
        { name: 'LUÍS FELIPE 8º ANO', donation: 20 },
        { name: 'LUIZA 8° ANO', donation: 0 },
        { name: 'MARIA CLARA 8° ANO', donation: 20 },
        { name: 'MARIA FERNANDA 8° ANO', donation: 110 },
        { name: 'MARIANA 8° ANO', donation: 20 },
        { name: 'MATHEUS 8° ANO', donation: 20 },
        { name: 'THÉO 8° ANO', donation: 20 },
        { name: 'ANGELINA 9° ANO', donation: 20 },
        { name: 'DANITCHELE 9° ANO', donation: 20 },
        { name: 'EDUARDO 9° ANO', donation: 20 },
        { name: 'GIOVANNA 9° ANO', donation: 20 },
        { name: 'GUILHERME 9º ANO', donation: 20 },
        { name: 'ENZO 1° MÉDIO', donation: 110 },
        { name: 'MATHEUS 1° MÉDIO', donation: 50 }
    ];

    const donators = writable(data);

    /* src\components\CFC.svelte generated by Svelte v3.50.1 */
    const file$1 = "src\\components\\CFC.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i].name;
    	child_ctx[6] = list[i].donation;
    	return child_ctx;
    }

    // (40:8) {#each donatorsTable as { name, donation }}
    function create_each_block$1(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*name*/ ctx[5] + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = pricify(/*donation*/ ctx[6]) + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = pricify(/*donation*/ ctx[6] - /*used*/ ctx[3]) + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			attr_dev(td0, "class", "svelte-15zvcps");
    			add_location(td0, file$1, 41, 16, 1131);
    			attr_dev(td1, "class", "svelte-15zvcps");
    			add_location(td1, file$1, 42, 16, 1164);
    			attr_dev(td2, "class", "svelte-15zvcps");
    			add_location(td2, file$1, 43, 16, 1210);
    			add_location(tr, file$1, 40, 12, 1109);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*donatorsTable*/ 1 && t0_value !== (t0_value = /*name*/ ctx[5] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*donatorsTable*/ 1 && t2_value !== (t2_value = pricify(/*donation*/ ctx[6]) + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*donatorsTable*/ 1 && t4_value !== (t4_value = pricify(/*donation*/ ctx[6] - /*used*/ ctx[3]) + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(40:8) {#each donatorsTable as { name, donation }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p0;
    	let t4;
    	let p1;
    	let t7;
    	let table;
    	let tr;
    	let th0;
    	let t9;
    	let th1;
    	let t11;
    	let th2;
    	let t13;
    	let each_value = /*donatorsTable*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Controle de Fundos";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = `Arrecadações: ${pricify(/*revenue*/ ctx[1])}`;
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = `Despesas: ${pricify(/*debt*/ ctx[2])}`;
    			t7 = space();
    			table = element("table");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "Nome";
    			t9 = space();
    			th1 = element("th");
    			th1.textContent = "Doação";
    			t11 = space();
    			th2 = element("th");
    			th2.textContent = "Cashback";
    			t13 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h1, file$1, 30, 4, 798);
    			add_location(p0, file$1, 31, 4, 832);
    			add_location(p1, file$1, 32, 4, 879);
    			attr_dev(th0, "class", "svelte-15zvcps");
    			add_location(th0, file$1, 35, 12, 954);
    			attr_dev(th1, "class", "svelte-15zvcps");
    			add_location(th1, file$1, 36, 12, 981);
    			attr_dev(th2, "class", "svelte-15zvcps");
    			add_location(th2, file$1, 37, 12, 1010);
    			add_location(tr, file$1, 34, 8, 936);
    			attr_dev(table, "class", "svelte-15zvcps");
    			add_location(table, file$1, 33, 4, 919);
    			add_location(div, file$1, 29, 0, 787);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p0);
    			append_dev(div, t4);
    			append_dev(div, p1);
    			append_dev(div, t7);
    			append_dev(div, table);
    			append_dev(table, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t9);
    			append_dev(tr, th1);
    			append_dev(tr, t11);
    			append_dev(tr, th2);
    			append_dev(table, t13);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*pricify, donatorsTable, used*/ 9) {
    				each_value = /*donatorsTable*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(table, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function pricify(x) {
    	return x.toLocaleString('pt-br', {
    		minimumFractionDigits: 2,
    		style: 'currency',
    		currency: 'BRL'
    	});
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CFC', slots, []);
    	let donatorsTable;
    	let expensesTable;

    	donators.subscribe(data => {
    		$$invalidate(0, donatorsTable = [...data]);
    	});

    	expenses.subscribe(data => {
    		expensesTable = [...data];
    	});

    	donatorsTable.sort((b, a) => a.donation - b.donation);
    	let revenue = donatorsTable.reduce((acc, donator) => acc += donator.donation, 0);
    	let debt = expensesTable.reduce((acc, purchase) => acc += purchase.price * purchase.amount, 0);
    	let used = debt / donatorsTable.length;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CFC> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		donatorsTable,
    		expensesTable,
    		donators,
    		expenses,
    		revenue,
    		debt,
    		used,
    		pricify
    	});

    	$$self.$inject_state = $$props => {
    		if ('donatorsTable' in $$props) $$invalidate(0, donatorsTable = $$props.donatorsTable);
    		if ('expensesTable' in $$props) expensesTable = $$props.expensesTable;
    		if ('revenue' in $$props) $$invalidate(1, revenue = $$props.revenue);
    		if ('debt' in $$props) $$invalidate(2, debt = $$props.debt);
    		if ('used' in $$props) $$invalidate(3, used = $$props.used);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [donatorsTable, revenue, debt, used];
    }

    class CFC extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CFC",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Overdebt.svelte generated by Svelte v3.50.1 */
    const file = "src\\components\\Overdebt.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i].name;
    	child_ctx[3] = list[i].donation;
    	return child_ctx;
    }

    // (42:4) {#each over as { name, donation }}
    function create_each_block(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*name*/ ctx[2] + "";
    	let t0;
    	let t1;
    	let td1;
    	let t2_value = pricify$1(/*donation*/ ctx[3]) + "";
    	let t2;
    	let t3;
    	let td2;
    	let t4_value = pricify$1(/*donation*/ ctx[3] - 20) + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			t2 = text(t2_value);
    			t3 = space();
    			td2 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			attr_dev(td0, "class", "svelte-15zvcps");
    			add_location(td0, file, 43, 12, 954);
    			attr_dev(td1, "class", "svelte-15zvcps");
    			add_location(td1, file, 44, 12, 983);
    			attr_dev(td2, "class", "svelte-15zvcps");
    			add_location(td2, file, 45, 12, 1025);
    			add_location(tr, file, 42, 8, 936);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td2);
    			append_dev(td2, t4);
    			append_dev(tr, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*over*/ 1 && t0_value !== (t0_value = /*name*/ ctx[2] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*over*/ 1 && t2_value !== (t2_value = pricify$1(/*donation*/ ctx[3]) + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*over*/ 1 && t4_value !== (t4_value = pricify$1(/*donation*/ ctx[3] - 20) + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(42:4) {#each over as { name, donation }}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let t4;
    	let t5_value = pricify$1(/*total*/ ctx[1]) + "";
    	let t5;
    	let t6;
    	let table;
    	let tr;
    	let th0;
    	let t8;
    	let th1;
    	let t10;
    	let th2;
    	let t12;
    	let each_value = /*over*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Overdebt";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Doações extras que precisam ser retornadas";
    			t3 = space();
    			p1 = element("p");
    			t4 = text("Total: ");
    			t5 = text(t5_value);
    			t6 = space();
    			table = element("table");
    			tr = element("tr");
    			th0 = element("th");
    			th0.textContent = "Nome";
    			t8 = space();
    			th1 = element("th");
    			th1.textContent = "Doação";
    			t10 = space();
    			th2 = element("th");
    			th2.textContent = "Cashback";
    			t12 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h1, file, 32, 0, 692);
    			add_location(p0, file, 33, 0, 711);
    			add_location(p1, file, 34, 0, 763);
    			attr_dev(th0, "class", "svelte-15zvcps");
    			add_location(th0, file, 37, 8, 825);
    			attr_dev(th1, "class", "svelte-15zvcps");
    			add_location(th1, file, 38, 2, 842);
    			attr_dev(th2, "class", "svelte-15zvcps");
    			add_location(th2, file, 39, 2, 861);
    			add_location(tr, file, 36, 4, 811);
    			attr_dev(table, "class", "svelte-15zvcps");
    			add_location(table, file, 35, 0, 798);
    			add_location(div, file, 31, 0, 685);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, p0);
    			append_dev(div, t3);
    			append_dev(div, p1);
    			append_dev(p1, t4);
    			append_dev(p1, t5);
    			append_dev(div, t6);
    			append_dev(div, table);
    			append_dev(table, tr);
    			append_dev(tr, th0);
    			append_dev(tr, t8);
    			append_dev(tr, th1);
    			append_dev(tr, t10);
    			append_dev(tr, th2);
    			append_dev(table, t12);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(table, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*total*/ 2 && t5_value !== (t5_value = pricify$1(/*total*/ ctx[1]) + "")) set_data_dev(t5, t5_value);

    			if (dirty & /*pricify, over*/ 1) {
    				each_value = /*over*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(table, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let total;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Overdebt', slots, []);
    	let over;

    	donators.subscribe(data => {
    		$$invalidate(0, over = data.filter(donator => donator.donation > 20).sort((a, b) => b.donation - a.donation));
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Overdebt> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ pricify: pricify$1, donators, expenses, over, total });

    	$$self.$inject_state = $$props => {
    		if ('over' in $$props) $$invalidate(0, over = $$props.over);
    		if ('total' in $$props) $$invalidate(1, total = $$props.total);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*over*/ 1) {
    			$$invalidate(1, total = over.reduce((acc, donator) => acc += donator.donation - 20, 0));
    		}

    		if ($$self.$$.dirty & /*total*/ 2) {
    			expenses.update(data => {
    				data.push({
    					store: 'Gincana',
    					item: 'Overdebt',
    					price: total,
    					amount: 1
    				});

    				return data;
    			});
    		}
    	};

    	return [over, total];
    }

    class Overdebt extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Overdebt",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\components\Bottles.svelte generated by Svelte v3.50.1 */

    function create_fragment$1(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Bottles', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Bottles> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Bottles extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bottles",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.50.1 */

    function create_fragment(ctx) {
    	let price;
    	let t0;
    	let expenses;
    	let t1;
    	let overdebt;
    	let t2;
    	let cfc;
    	let t3;
    	let bottles;
    	let current;
    	price = new Price({ $$inline: true });
    	expenses = new Expenses({ $$inline: true });
    	overdebt = new Overdebt({ $$inline: true });
    	cfc = new CFC({ $$inline: true });
    	bottles = new Bottles({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(price.$$.fragment);
    			t0 = space();
    			create_component(expenses.$$.fragment);
    			t1 = space();
    			create_component(overdebt.$$.fragment);
    			t2 = space();
    			create_component(cfc.$$.fragment);
    			t3 = space();
    			create_component(bottles.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(price, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(expenses, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(overdebt, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(cfc, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(bottles, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(price.$$.fragment, local);
    			transition_in(expenses.$$.fragment, local);
    			transition_in(overdebt.$$.fragment, local);
    			transition_in(cfc.$$.fragment, local);
    			transition_in(bottles.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(price.$$.fragment, local);
    			transition_out(expenses.$$.fragment, local);
    			transition_out(overdebt.$$.fragment, local);
    			transition_out(cfc.$$.fragment, local);
    			transition_out(bottles.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(price, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(expenses, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(overdebt, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(cfc, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(bottles, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Price, Expenses, CFC, Overdebt, Bottles });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    // npm i 
    // npm run dev -- Starts the live reload
    // npm run deploy

    return app;

})();
//# sourceMappingURL=bundle.js.map
