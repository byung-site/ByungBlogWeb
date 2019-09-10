import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import DocumentTitle from '../components/DocumentTitle'

export default class Personal extends React.Component {
    render() {
        return(
            <DocumentTitle title='个人中心'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>个人中心</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </DocumentTitle>
        );
    }
}