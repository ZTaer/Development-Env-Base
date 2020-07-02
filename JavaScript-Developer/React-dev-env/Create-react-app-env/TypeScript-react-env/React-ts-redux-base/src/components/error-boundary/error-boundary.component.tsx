import React from 'react';
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText } from './error-boundary.styles';

interface IProps {
    [propsName:string]: any
}
interface IState {
    [propsName:string]: any
}

class ErrorBoundary extends React.Component<IProps , IState> {
    constructor(){
        super(),
        this.state = {
            errorState: false,
        }
    }

    // 定义静态函数: 专门抓取错误, 出现错误errorState: true
    static getDerivedStateFromError( error: any ){
        return {
           errorState:  true 
        };
    }

    componentDidCatch( error?:any,  info?:any ){
        console.log(error);
    }

    // 错误状态为true则渲染报错组件，否则渲染正常组件
    render(){
        if( this.state.errorState ){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl = '/images/error/error.png' />
                    <ErrorImageText>
                        对不起! 好像出现了一些错误/(ㄒoㄒ)/~~ <br/>
                            Sorry! Some errors have occurred.
                    </ErrorImageText>
                </ErrorImageOverlay>
            );
        }
        return this.props.children; // 不要忘记是继承的children哦，嵌套在组件内的内容 
    }

}

export default ErrorBoundary;