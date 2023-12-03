import React from 'react';
import {Frame} from '@shopify/polaris';
import ListPage from '../components/ListPage/ListPage';
const SeatLayoutsPage = () => {

    return (
        <Frame>
            <ListPage
                title="Notification List"
                resourceName={{ singular: 'Notification', plural: 'Notification' }}
                fetchUrl="/api/mobile_notification/fetchList"
                deleteUrl="/api/seat-layout/deleteAll"
                createUrl="/page_notification_form"
                editUrl="/page_notification_form"
            />
        </Frame>
    );
};

export default SeatLayoutsPage;
