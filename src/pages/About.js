import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import DocumentTitle from '../components/DocumentTitle'

export default class About extends React.Component {
    render() {
        return(
            <DocumentTitle title='关于博主'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>关于博主</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </DocumentTitle>
        );
    }
}