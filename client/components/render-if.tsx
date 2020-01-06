import React, { CSSProperties, Fragment, PropsWithChildren } from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus } from "react-transition-group/Transition";

interface Props {
    condition: boolean;
    fadeDuration?: number;
    enableFading?: boolean;
}


const styles: { [k in TransitionStatus]: CSSProperties } = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: "none" },
    unmounted: { opacity: 0, display: "none" },
};

function transitionStyle(state: TransitionStatus, duration: number): CSSProperties {
    return {
        ...styles[state],
        transition: `opacity ${ duration }ms ease-out`,
    }
}

export function RenderIf(props: PropsWithChildren<Props>) {
    let duration = props.fadeDuration as number;
    let animate  = props.enableFading;

    // noinspection SuspiciousTypeOfGuard
    if (animate && typeof duration !== "number") {
        duration = 300;
    } else if (duration && !animate) {
        animate = true;
    }

    return (
        animate ? (
            <Transition in={ props.condition } timeout={ duration } mountOnEnter={ true } unmountOnExit={ true }>
                { state => (
                    <div style={ transitionStyle(state, duration) }>
                        { props.children }
                    </div>
                ) }
            </Transition>
        ) : (
            <Fragment>
                { props.condition ? props.children : null }
            </Fragment>
        )
    )
}
