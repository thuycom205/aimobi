
import React, { useState,useEffect, useCallback } from 'react';
import { Frame, Page, Layout, Card, FormLayout, TextField, Button } from '@shopify/polaris';

const MyComponent = () => {
    const [id, setId] = useState('');
    const [shop_name, setShop_name] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [app_name, setApp_name] = useState('');
    const [app_nameError, setApp_nameError] = useState('');
    const [splash_screen_img, setSplash_screen_img] = useState('');
    const [splash_screen_imgError, setSplash_screen_imgError] = useState('');
    const [icon_url, setIcon_url] = useState('');
    const [icon_urlError, setIcon_urlError] = useState('');
    const [firebase_information, setFirebase_information] = useState('na');
    const [app_submission_status, setApp_submission_status] = useState('pending');
    const [app_version, setApp_version] = useState('1.0.0');
    const [app_versionError, setApp_versionError] = useState('');
    const [created_at, setCreated_at] = useState('');
    const [updated_at, setUpdated_at] = useState('');


    const validatePhone = (phone) => {
        if (!phone || isNaN(Number(phone))) return 'This field must be a number';
        return '';
    };

    const validateEmail = (email) => {
        if (email && !/\S+@\S+\.\S+/.test(email)) return 'Invalid email format';
        return '';
    };

    const validateApp_name = (app_name) => {
        if (!app_name) return 'This field is required';
        return '';
    };

    const validateSplash_screen_img = (splash_screen_img) => {
        if (splash_screen_img && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(splash_screen_img)) return 'Invalid URL format';
        return '';
    };

    const validateIcon_url = (icon_url) => {
        if (icon_url && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(icon_url)) return 'Invalid URL format';
        return '';
    };

    const validateApp_version = (app_version) => {
        if (!app_version) return 'This field is required';
        return '';
    };



    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const fetchedId = urlParams.get('id') || '0';
        // Example of setting a specific field, adjust as necessary
        // setId(fetchedId);
        fetch(window.dev_server + `/api/mobile_submission/fetch?id=${fetchedId}&shop_name=` + window.shop_name)
            .then(response => response.json())
            .then(data => {
                setId(data.id || '');
                setShop_name(data.shop_name || '');
                setPhone(data.phone || '');
                setEmail(data.email || '');
                setApp_name(data.app_name || '');
                setSplash_screen_img(data.splash_screen_img || '');
                setIcon_url(data.icon_url || '');
                setFirebase_information(data.firebase_information || '');
                setApp_submission_status(data.app_submission_status || '');
                setApp_version(data.app_version || '');
                setCreated_at(data.created_at || '');
                setUpdated_at(data.updated_at || '');

            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handleSubmit = useCallback(() => {
        let isFormValid = true;

        const phoneError = validatePhone(phone);

        setPhoneError(phoneError);
        console.log(phoneError);
        if (phoneError) isFormValid = false;
        const emailError = validateEmail(email);
        setEmailError(emailError);
        if (emailError) isFormValid = false;
        const app_nameError = validateApp_name(app_name);
        setApp_nameError(app_nameError);
        if (app_nameError) isFormValid = false;
        const splash_screen_imgError = validateSplash_screen_img(splash_screen_img);
        setSplash_screen_imgError(splash_screen_imgError);
        if (splash_screen_imgError) isFormValid = false;
        const icon_urlError = validateIcon_url(icon_url);
        setIcon_urlError(icon_urlError);
        if (icon_urlError) isFormValid = false;
        const app_versionError = validateApp_version(app_version);
        setApp_versionError(app_versionError);
        if (app_versionError) isFormValid = false;
        if (!isFormValid) {
            alert('Please fix all errors before submitting');
        }
        const payload = {
            id: id,  phone: phone, email: email, app_name: app_name, splash_screen_img: splash_screen_img, icon_url: icon_url, firebase_information: firebase_information, app_submission_status: app_submission_status, app_version: app_version, created_at: created_at, updated_at: updated_at,
            shop_name: window.shop_name
        };
        fetch(window.dev_server + '/api/mobile_submission/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(response => {
                // ... response handling
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id, shop_name, phone, email, app_name, splash_screen_img, icon_url, firebase_information, app_submission_status, app_version, created_at, updated_at, ]);
    return (
        <Frame>
            <Page fullWidth>
                <Layout>
                    <Layout.Section>
                        <Card sectioned>
                            <FormLayout>
                                <TextField label="Id" value={id} onChange={(value) => setId(value)} type="field_text" />
                                <TextField label="Shop_name" value={shop_name} onChange={(value) => setShop_name(value)} type="field_text" />
                                <TextField label="Phone" value={phone} onChange={(value) => setPhone(value)} error={phoneError} type="field_text" />
                                <TextField label="Email" value={email} onChange={(value) => setEmail(value)} error={emailError} type="field_text" />
                                <TextField label="App_name" value={app_name} onChange={(value) => setApp_name(value)} error={app_nameError} type="field_text" />
                                <TextField label="Splash_screen_img" value={splash_screen_img} onChange={(value) => setSplash_screen_img(value)} error={splash_screen_imgError} type="field_text" />
                                <TextField label="Icon_url" value={icon_url} onChange={(value) => setIcon_url(value)} error={icon_urlError} type="field_text" />
                                <TextField label="Firebase_information" value={firebase_information} onChange={(value) => setFirebase_information(value)} type="textarea" />
                                <TextField label="App_submission_status" value={app_submission_status} onChange={(value) => setApp_submission_status(value)} type="select" />
                                <TextField label="App_version" value={app_version} onChange={(value) => setApp_version(value)} error={app_versionError} type="field_text" />
                                <TextField label="Created_at" value={created_at} onChange={(value) => setCreated_at(value)} type="field_text" />
                                <TextField label="Updated_at" value={updated_at} onChange={(value) => setUpdated_at(value)} type="field_text" />

                                <Button onClick={handleSubmit}>Submit</Button>
                            </FormLayout>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    );
};

export default MyComponent;
