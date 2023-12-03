import React, { useState, useEffect } from 'react';
import { Frame, Page, Layout, Card, FormLayout, TextField, Button } from '@shopify/polaris';

function MyComponent() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [url, setUrl] = useState('');
    const [requiredField, setRequiredField] = useState('');

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [dateTimeError, setDateTimeError] = useState('');
    const [urlError, setUrlError] = useState('');
    const [requiredFieldError, setRequiredFieldError] = useState('');

    const validateEmail = (email) => {
        if (!email) {
            return 'Email is required';
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Email format is invalid';
        }
        return '';
    };

    const validatePhone = (phone) => {
        if (!phone) {
            return 'Phone is required';
        }
        // if (!/^\d{10}$/.test(phone)) {
        //     return 'Phone format is invalid (should be 10 digits)';
        // }
        return '';
    };
    useEffect(() => {
        const fetchData = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id') || 0; // Get id from URL or default to 0
            const shopName = 'exampleShop'; // Replace with dynamic shop_name if needed

            try {
                const response = await fetch(`https://your-mockup-api.com/data?shop_name=${shopName}&id=${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();

                // Set the state with the fetched data
                setEmail(jsonData.email || '');
                setPhone(jsonData.phone || '');
                // ... set other state variables as necessary
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); //
    const onSubmission = async () => {
        const formData = {
            email: email,
            phone: phone,
            dateTime: dateTime,
            url: url,
            requiredField: requiredField
        };

        try {
            const response = await fetch('https://your-mockup-api-server.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Submission successful:', data);
            // Handle success (e.g., show success message)
        } catch (error) {
            console.error('Submission failed:', error);
            // Handle error (e.g., show error message)
        }
    };
    const handleSubmit = () => {
        const emailErrMsg = validateEmail(email);
        const phoneErrMsg = validatePhone(phone);
        // const dateTimeErrMsg = validateEmail(dateTime);
        const urlError = validateEmail(url);
        const requiredFieldError = validateEmail(requiredField);

        setEmailError(emailErrMsg);
        setPhoneError(phoneErrMsg);
        if (!emailError && !phoneError && !urlError && !requiredFieldError) {
            console.log('Form data:', { email, phone, dateTime, url, requiredField });
            // Submit form data
        }
    };

    return (
        <Frame>
            <Page fullWidth>
                <Layout>
                    <Layout.Section>
                        <Card sectioned>
                            <FormLayout>
                                <TextField
                                    label="Email"
                                    value={email}
                                    onChange={setEmail}
                                    error={emailError}
                                    type="email"
                                    autoComplete="email"
                                />
                                <TextField
                                    label="Phone"
                                    value={phone}
                                    onChange={setPhone}
                                    error={phoneError}
                                    type="tel"
                                />
                                <TextField
                                    label="Date and Time"
                                    value={dateTime}
                                    onChange={setDateTime}
                                    error={dateTimeError}
                                    type="datetime-local"
                                />
                                <TextField
                                    label="Website URL"
                                    value={url}
                                    onChange={setUrl}
                                    error={urlError}
                                    type="url"
                                />
                                <TextField
                                    label="Required Field"
                                    value={requiredField}
                                    onChange={setRequiredField}
                                    error={requiredFieldError}
                                    type="text"
                                />
                                <Button onClick={handleSubmit}>Submit</Button>
                            </FormLayout>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </Frame>
    );
}

export default MyComponent;
