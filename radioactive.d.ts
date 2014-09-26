/**
 * This typescript definition doubles as documentation.
 * It is a good idea to read it through.
 *
 * Generating docs from this file is also a good idea.
 * In fact, there's an open ticket. Feel like giving it a shot?
 * https://github.com/radioactive/radioactive/issues/3
 *
 */
declare module "radioactive" {


    //////////// radioactive() --> radioactive.react()

    /**
     * Proxies to react() when called with one argument of type function
     */
    function r( expr: () => any ) : r.Stopper;

    /**
     * Proxies to react( expr, callback )
     */
    function r<T>( expr: () => T, callback: Callback<T> ) : r.Stopper;


    //////////// radioactive() --> radioactive.cell()

    /**
     * Returns a cell initialized to undefined
     */
    function r(): r.Cell<any>;


    /**
     * Returns a cell initialized to @value when called with one argument that is not a function
     * ( note that if the argument is a function this will not return a cell - it will forward to react() instead )
     */
    function r<T>( value: T ): r.Cell<T>;



    module r {

        /**
         * Returns true if we are currently within a reactive loop.
         * ( we are inside a call to radioactive.react() or radioactive.once() ).
         *
         */
        function active(): boolean;

        /**
         * Request a Notifier.
         * This method may return null or undefined if we are not running within a reactive context.
         * In other words: if radioactive.active() == false then this method will return null
         */
        function notifier(): Notifier;

        /**
         * Returns a forker.
         *
         * @see https://github.com/radioactive/radioactive/blob/master/test/radioactive.fork.tests.coffee
         *
         */
        function fork(): Forker;

        /**
         * Creates a Cell initialized to undefined
         */
        function cell<T>(): Cell<T>;

        /**
         * Creates a cell initialized to @value
         */
        function cell<T>( value:T ): Cell<T>;


        /**
         * Throws a StopSignal.
         * Use this to terminate a reactive loop.
         *
         * @see https://github.com/radioactive/radioactive/blob/master/test/radioactive.stop.tests.coffee
         */
        function stop(): void;


        function react( expr: () => any ): Stopper;

        function react<T>( expr: () => T, callback: Callback<T> ): Stopper;

        function once<T>( expr: () => T, callback: Callback<T> ): Stopper;


        /**
         * Evaluates an expression and returns true if the expression throws a WaitSignal
         * false otherwise.
         *
         * This function is R(1). Once the expression stops "waiting" it will reevaluate itself.
         * You normally use this to show temporary "loading..." messages while R(2) expressions
         * are in waiting state.
         *
         * @param expr
         */
        function waiting( expr: () => any ): boolean;

        /**
         * Throws a WaitSignal.
         * Use this from a data producing expression to indicate
         * there is work needed to be done.
         * Note: It is your responsibility to notify when the work has completed.
         * You notify by using the traditional radioactive.notifier() workflow.
         */
        function wait(): void;

        /**
         * Transforms an async function into a sync function that throws WaitSignals and caches results.
         * The async function must follow the Node.js callback convention:
         *
         * function( error, result ){}
         *
         * @param async
         */
        function syncify( async: Function ): Function;

        /**
         *
         * @param opts
         */
        function syncify( opts: SyncifyOpts ): Function;

        interface SyncifyOpts {

            /**
             *
             */
            poll?: number ;

            /**
             *
             * @param args
             */
            hasher?: ( args: Array<any> ) => string ;


            /**
             * Services are local by default ( as opposed to global ).
             * A local service will receive its own cache that will last for one evaluation
             * ( it is a bit more complicated than that in reality, but that is a fair approximation ).
             * This is what you normally do when calling async functions. Each invocation keeps its own state.
             *
             * However. In many occasions it makes sense to have one global service.
             * Specially when hitting a remote service.
             *
             */
            global?: boolean ;


            func: Function ;

        }

        /**
         * Utility.
         * Calling this function will return an R(2) function that knows how to echo() one value.
         * R(0) ( but returns an R(2) function )
         * @param delay
         */
        function echo( delay: number = 1000 ): ( string ) => void;

        /**
         * Utility. Returns the current timestamp.
         * @param interval
         * R(1)
         */
        function time( interval: number = 1000 ): number;

        /**
         * Takes a R(>0) expression and makes it R(0)
         * @param expr
         */
        function mute<T>( expr: () => T ): () => T

        /**
         *
         */
        interface Notifier {
            /**
             * Shortcut for fire()
             */
            (): void
            cancel(): void
            fire(): void
        }


        interface Callback<T> {
            ( error?: Error, result?: T ) : void ;
        }


        interface Stopper {
            /**
             * Stop this watcher.
             */
            (): void
        }

        interface Forker {
            /**
             * Executes a block of code inside a fork.
             * May return null a few times before returning
             * the actual value.
             */
            <T>( expr: () => T ): T

            /**
             * Waits until all forked blocks of code are finished
             */
            join(): void
        }

        /**
         A Cell is a "Reactive Variable".
         You can put anything you want in it by calling `cell( value )` ( one parameter )
         and then you can get it back by calling cell() ( with no parameters ).

         How do I set a cell to an error state?
         If you pass a value where ( value instanceof Error == true )
         Then the cell will automatically be set to an error state.

         If you wish to pass an error so that it can be stored
         you will need to wrap it into something else.
         */
        interface Cell<T> {
            ( ): T
            get( ): T

            ( value: T ): void
            set( value: T ): void

            ( value: Error ): void
            set( value: Error ): void

            ( error?: Error, value?: T ): void

            /**
             * Whether someone is interested in knowing if our value changes.
             * This may change at any time as the cell may be accessed and notifiers requested.
             */
            monitored():boolean
        }

    }

export = r;
}
