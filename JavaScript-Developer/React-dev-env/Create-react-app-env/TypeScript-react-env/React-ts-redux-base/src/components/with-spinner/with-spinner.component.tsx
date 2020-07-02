import React from 'react';
import Spinner from '../spinner/spinner.component';

// hoc加载器
const WithSpinner = ( PropsComponent: any) => ({ isLoadding, ...otherProps }:any ) => {

    return isLoadding ?
    <Spinner /> :
    <PropsComponent { ...otherProps } />
}

export default WithSpinner;