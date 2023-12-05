import React from 'react';
import {Frame,Page } from '@shopify/polaris';
import ListPage from '../components/ListPage/ListPage';
import {useNavigate} from 'react-router-dom';

const SeatLayoutsPage = () => {
    const navigate = useNavigate();

    return (
        <Frame>
        <Page
            secondaryActions={[
                {   content: 'Back to Home',
                    onAction: () => {
                        navigate('/') // Close the modal after adding the element
                        // handleAddElement(optionTypeSelected);
                        // toggleModal(); // Close the modal after adding the element
                    },
                },
            ]}
        >
            <ListPage
                title="Notification List"
                resourceName={{ singular: 'Notification', plural: 'Notification' }}
                fetchUrl="/api/mobile_notification/fetchList"
                deleteUrl="/api/seat-layout/deleteAll"
                createUrl="/page_notification_form"
                editUrl="/page_notification_form"
            />
            </Page>
        </Frame>
    );
};

export default SeatLayoutsPage;
