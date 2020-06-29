import React from 'react';
import IndexPeople from '../../components/index-people/index-people.component';

import { Link } from 'react-router-dom';

const Index = () => {

    return (
        <div className="index">
            <Link to={"/example"} >example</Link>
            <IndexPeople target={"L"} />
            <p style={{
                color: "fff",
                fontSize: "1rem",
                letterSpacing: "1px",
            }} >
                0. 挂载: constructor() --》 componentWillMount() --》 render() --》 componentDidMount()<br/>
                1. 更新: shouldComponentUpdate() --》 render() --》 componentDidUpdate()<br/>
                2. 卸载: componetWillUnmout()<br/>
            </p>
        </div>
    );
};

export default Index;