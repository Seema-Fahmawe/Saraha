import _ from 'lodash';
import React from 'react'

const pagination = (users,pageNumber,pageSize) => {
    const startIndex=pageNumber * pageSize;
    return _(users).slice(startIndex).take(pageSize).value();

}

export default pagination