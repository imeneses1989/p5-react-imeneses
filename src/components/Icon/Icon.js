import React from 'react';

export default class Icon extends React.Component {
    static defaultProps = {
        size: 16,
        viewbox: "0 0 24 24"
    };

    renderGraphic() {
        switch (this.props.icon) {
            case 'image':
                return (
                    <g><path d="M21 19v-14c0-1.1-.9-2-2-2h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-12.5-5.5l2.5 3.01 3.5-4.51 4.5 6h-14l3.5-4.5z"></path></g>
                );
            case 'my-icon':
                return (
                    <g><path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z"/></g>
                );
            case 'another-icon':
                return (
                    <g><path d="M7.41 15.41l4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z"/></g>
                );
            case 'format-bold':
                return (
                    <g><path d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4h-6.25v14h7.04c2.09
          0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zm-5.6-4.29h3c.83 0 1.5.67 1.5 1.5s-.67
          1.5-1.5 1.5h-3v-3zm3.5 9h-3.5v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"></path></g>
                );
            case 'format-italic':
                return (
                    <g><path d="M10 4v3h2.21l-3.42 8h-2.79v3h8v-3h-2.21l3.42-8h2.79v-3z"></path></g>
                );
            case 'format-underline':
                return (
                    <g><path d="M12 17c3.31 0 6-2.69 6-6v-8h-2.5v8c0 1.93-1.57 3.5-3.5
          3.5s-3.5-1.57-3.5-3.5v-8h-2.5v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2h-14z"></path></g>
                );
            case 'format-align-left':
                return (
                    <g><path d="M15 15h-12v2h12v-2zm0-8h-12v2h12v-2zm-12
          6h18v-2h-18v2zm0 8h18v-2h-18v2zm0-18v2h18v-2h-18z"></path></g>
                );
            case 'format-align-center':
                return (
                    <g><path d="M7 15v2h10v-2h-10zm-4 6h18v-2h-18v2zm0-8h18v-2h-18v2zm4-6v2h10v-2h-10zm-4-4v2h18v-2h-18z"></path></g>
                );
            case 'format-align-right':
                return (
                    <g><path d="M3 21h18v-2h-18v2zm6-4h12v-2h-12v2zm-6-4h18v-2h-18v2zm6-4h12v-2h-12v2zm-6-6v2h18v-2h-18z"></path></g>
                );
            case 'add-box':
                return (
                    <g><path d="M19 3h-14c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-2
          10h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z"></path></g>
                );
            case 'add':
                return (
                    <g><path d="M19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z"></path></g>
                );
            case 'text-format':
                return (
                    <g><path d="M5 17v2h14v-2h-14zm4.5-4.2h5l.9 2.2h2.1l-4.75-11h-1.5l-4.75
          11h2.1l.9-2.2zm2.5-6.82l1.87 5.02h-3.74l1.87-5.02z"></path></g>
                );
            case 'text':
                return (
                    <g><path d="M5 17v2h14v-2h-14zm4.5-4.2h5l.9 2.2h2.1l-4.75-11h-1.5l-4.75
           11h2.1l.9-2.2zm2.5-6.82l1.87 5.02h-3.74l1.87-5.02z"></path></g>
                );
            case 'rectangle':
                return (
                    <rect width={14} height={14} x={4} y={5} rx={3} ry={3} />
                );
            case 'circle':
                return (
                    <circle r={8} cx={11} cy={12} />
                );
            case 'polygon':
                return (
                    <g transform={"scale(0.034) translate(100 25)"}>
                        <path d="M477.043,219.205L378.575,48.677c-7.974-13.802-22.683-22.292-38.607-22.292H143.041c-15.923,
                    0-30.628,8.49-38.608,22.292 L5.971,219.205c-7.961,13.801-7.961,30.785,0,44.588l98.462,
                    170.543c7.98,13.802,22.685,22.293,38.608,22.293h196.926 c15.925,0,30.634-8.491,
                    38.607-22.293l98.469-170.543C485.003,249.99,485.003,233.006,477.043,219.205z"/>
                    </g>
                );
            case 'rotate':
                return (
                    <g><path d="M18.4 10.6c-1.85-1.61-4.25-2.6-6.9-2.6-4.65 0-8.58 3.03-9.96
           7.22l2.36.78c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88l-3.62
           3.62h9v-9l-3.6 3.6z"></path></g>
                );
            case 'send-to-back':
                return (
                    <g>
                        <rect x={7} y={7} width={13} height={13} fill="#ababab" strokeWidth={1} stroke="black" />
                        <rect x={1} y={1} width={13} height={13} fill="white" stroke="black" strokeWidth={1} />
                    </g>
                );
            case 'bring-to-front':
                return (
                    <g>
                        <rect x={7} y={7} width={13} height={13} fill="white" strokeWidth={1} stroke="black" />
                        <rect x={1} y={1} width={13} height={13} fill="#ababab" stroke="black" strokeWidth={1} />
                    </g>
                );
            case 'remove-icon':
                return (
                    <g>
                        <path d="M 11.5 -0.03125 C 9.542969 -0.03125 7.96875 1.59375 7.96875 3.5625 L 7.96875 4 L 4 4 C 3.449219 4 3 4.449219 3 5 L 3 6 L 2 6 L 2 8 L 4 8 L 4 23 C 4 24.644531
                        5.355469 26 7 26 L 19 26 C 20.644531 26 22 24.644531 22 23 L 22 8 L 24 8 L 24 6 L 23 6 L 23 5 C 23 4.449219 22.550781 4 22 4 L 18.03125 4 L 18.03125 3.5625
                        C 18.03125 1.59375 16.457031 -0.03125 14.5 -0.03125 Z M 11.5 2.03125 L 14.5 2.03125 C 15.304688 2.03125 15.96875 2.6875 15.96875 3.5625 L 15.96875 4 L 10.03125
                        4 L 10.03125 3.5625 C 10.03125 2.6875 10.695313 2.03125 11.5 2.03125 Z M 6 8 L 11.125 8 C 11.25 8.011719 11.371094 8.03125 11.5 8.03125 L 14.5 8.03125 C 14.628906
                        8.03125 14.75 8.011719 14.875 8 L 20 8 L 20 23 C 20 23.5625 19.5625 24 19 24 L 7 24 C 6.4375 24 6 23.5625 6 23 Z M 8 10 L 8 22 L 10 22 L 10 10 Z M 12 10 L 12 22 L 14 22
                        L 14 10 Z M 16 10 L 16 22 L 18 22 L 18 10 Z "></path>
                    </g>
                );
            case 'copy-icon':
                return (
                    <g xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <g>
                                <path d="M24.065,34.555H5.489c-1.379,0-2.5-1.122-2.5-2.5V7.864c0-1.378,1.121-2.5,2.5-2.5h2.364c0.276,0,0.5,0.224,0.5,0.5
                                     s-0.224,0.5-0.5,0.5H5.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5v-2.365
                                          c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v2.365C26.565,33.433,25.444,34.555,24.065,34.555z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M29.065,29.19H10.489c-1.379,0-2.5-1.122-2.5-2.5V2.5c0-1.378,1.121-2.5,2.5-2.5h13.604c0.276,0,0.5,0.224,0.5,0.5
                                     S24.37,1,24.094,1H10.489c-0.827,0-1.5,0.673-1.5,1.5v24.19c0,0.827,0.673,1.5,1.5,1.5h18.576c0.827,0,1.5-0.673,1.5-1.5V7.661
                                          c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5V26.69C31.565,28.069,30.444,29.19,29.065,29.19z"/>
                                <path d="M31.065,8.161h-6.972c-0.276,0-0.5-0.224-0.5-0.5V0.688c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v6.473h6.472
                                     c0.276,0,0.5,0.224,0.5,0.5S31.342,8.161,31.065,8.161z"/>
                                <path d="M31.065,8.161c-0.13,0-0.26-0.051-0.358-0.151l-6.972-7.161c-0.192-0.198-0.188-0.514,0.01-0.707
                                     c0.197-0.191,0.516-0.187,0.707,0.01l6.972,7.161c0.192,0.198,0.188,0.514-0.01,0.707C31.317,8.114,31.191,8.161,31.065,8.161z"/>
                            </g>
                        </g>
                    </g>
                );
            default:
                return (
                    <g>
                        <rect x={7} y={7} width={13} height={13} fill="white" strokeWidth={1} stroke="black" />
                        <rect x={1} y={1} width={13} height={13} fill="#ababab" stroke="black" strokeWidth={1} />
                    </g>
                );
        }
    }
    render() {
        let styles = {
            fill: this.props.active? "#525252": "#b5b5b5",
            verticalAlign: "middle",
            width: this.props.size,
            height: this.props.size
        };
        return (
            <svg viewBox={this.props.viewbox}
                 onClick={this.props.onClick}
                 preserveAspectRatio="xMidYMid meet" fit="true"
                 style={{...styles, ...this.props.style}}>
                {this.renderGraphic()}
            </svg>
        );
    }
};
