/*global define,Promise*/

/**
 * Module defining GestureProvider. Created by vwoeltje on 11/22/14.
 */
define(
    [],
    function () {
        "use strict";

        /**
         * The GestureProvider exposes defined gestures. Gestures are used
         * do describe and handle general-purpose interactions with the DOM
         * that should be interpreted as interactions with domain objects,
         * such as right-clicking to expose context menus.
         *
         * Gestures are defined individually as extensions of the
         * `gestures` category. The gesture provider merely serves as an
         * intermediary between these and the `mct-representation` directive
         * where they are used.
         *
         * @constructor
         * @param {Gesture[]} gestures an array of all gestures which are
         *        available as extensions
         */
        function GestureProvider(gestures) {
            var gestureMap = {};

            function releaseGesture(gesture) {
                // Invoke the gesture's "destroy" method (if there is one)
                // to release any held resources and detach event handlers.
                if (gesture && gesture.destroy) {
                    gesture.destroy();
                }
            }

            function attachGestures(element, domainObject, gestureKeys) {
                // Look up the desired gestures, filter for applicability,
                // and instantiate them. Maintain a reference to allow them
                // to be destroyed as a group later.
                var attachedGestures = gestureKeys.map(function (key) {
                    return gestureMap[key];
                }).filter(function (Gesture) {
                    return Gesture !== undefined && (Gesture.appliesTo ?
                            Gesture.appliesTo(domainObject) :
                            true);
                }).map(function (Gesture) {
                    return new Gesture(element, domainObject);
                });

                return {
                    destroy: function () {
                        // Just call all the individual "destroy" methods
                        attachedGestures.forEach(releaseGesture);
                    }
                };
            }

            // Assemble all gestures into a map, for easy look up
            gestures.forEach(function (gesture) {
                gestureMap[gesture.key] = gesture;
            });


            return {
                /**
                 * Attach a set of gestures (indicated by key) to a
                 * DOM element which represents a specific domain object.
                 * @method
                 * @memberof GestureProvider
                 * @param element the jqLite-wrapped DOM element which the
                 *        user will interact with
                 * @param {DomainObject} domainObject the domain object which
                 *        is represented by that element
                 * @param {string[]} gestureKeys an array of keys identifying
                 *        which gestures should apply; these will be matched
                 *        against the keys defined in the gestures' extension
                 *        definitions
                 * @return {{ destroy: function }} an object with a `destroy`
                 *         method which can (and should) be used when a
                 *         gesture should no longer be applied to an element.
                 */
                attachGestures: attachGestures
            };
        }

        return GestureProvider;
    }
);