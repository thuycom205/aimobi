import { useState } from "react";
import { Card, TextContainer, Text } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ProductsCard() {
    const emptyToastProps = { content: null };
    const [isLoading, setIsLoading] = useState(true);
    const [toastProps, setToastProps] = useState(emptyToastProps);
    const fetch = useAuthenticatedFetch();
    const { t } = useTranslation();
    const productsCount = 5;

    const {
        data,
        refetch: refetchProductCount,
        isLoading: isLoadingCount,
        isRefetching: isRefetchingCount,
    } = useAppQuery({
        url: "/api/products/count",
        reactQueryOptions: {
            onSuccess: () => {
                setIsLoading(false);
            },
            // Adjust these options according to your needs
            refetchInterval: false, // Disable automatic refetching
        },
    });

    const toastMarkup = toastProps.content && !isRefetchingCount && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    );

    const handlePopulate = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/products/create");

            if (response.ok) {
                await refetchProductCount();
                setToastProps({
                    content: t("ProductsCard.productsCreatedToast", {
                        count: productsCount,
                    }),
                });
            } else {
                throw new Error('Failed to create products');
            }
        } catch (error) {
            console.error(error);
            setToastProps({
                content: t("ProductsCard.errorCreatingProductsToast"),
                error: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {toastMarkup}
            <Card
                title={t("ProductsCard.title")}
                sectioned
                primaryFooterAction={{
                    content: t("ProductsCard.populateProductsButton", {
                        count: productsCount,
                    }),
                    onAction: handlePopulate,
                    loading: isLoading,
                }}
            >
                <TextContainer spacing="loose">
                    <p>{t("ProductsCard.description")}</p>
                    <Text as="h4" variant="headingMd">
                        {t("ProductsCard.totalProductsHeading")}
                        <Text variant="bodyMd" as="p" fontWeight="semibold">
                            {isLoadingCount ? "-" : data?.count ?? '-'}
                        </Text>
                    </Text>
                </TextContainer>
            </Card>
        </>
    );
}
