import React from 'react';
import { Page, Card, Button, TextContainer } from '@shopify/polaris';

export default function GuidePage() {
    const navigateTo = (route) => {
        // Implement navigation logic here. For example:
        // navigate(route);
    };

    return (
        <>
            <Card sectioned>
                <TextContainer>
                    <h2>Create Screens</h2>
                    <p>Use the drag-and-drop interface to design the screens of your app. You can choose from a variety of templates or start from scratch. Add elements like images, text, buttons, and more by simply dragging them onto your screen layout.</p>
                    <Button onClick={() => navigateTo('/screen-builder')}>Start Creating Screens</Button>
                </TextContainer>
            </Card>

            <Card sectioned>
                <TextContainer>
                    <h2>Design Menus</h2>
                    <p>Similarly, you can create menus for your app. Drag and drop different menu items into your desired order, and customize their appearance to match your brand.</p>
                    <Button onClick={() => navigateTo('/menu-designer')}>Start Designing Menus</Button>
                </TextContainer>
            </Card>

            <Card sectioned>
                <TextContainer>
                    <h2>Create and Manage Notifications</h2>
                    <p>Effortlessly set up and personalize notifications in a tree view layout to keep your customers informed about the latest products, special offers, and other vital updates.</p>
                    <Button onClick={() => navigateTo('/notification-manager')}>Manage Notifications</Button>
                </TextContainer>
            </Card>

            <Card sectioned>
                <TextContainer>
                    <h2>App Submission Assistance</h2>
                    <p>After finalizing your app, you have the option to submit it to the Apple App Store and Google Play Store. Our drag-and-drop app builder service includes personalized assistance. Once you're ready to proceed, contact us and we'll guide you through the app submission process for a seamless experience.</p>
                    <Button onClick={() => navigateTo('/app-submission')}>Get Submission Assistance</Button>
                </TextContainer>
            </Card>
        </>
    );
}
