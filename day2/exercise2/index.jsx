import React, {useEffect, useState} from 'react'
import {Box, Text, Spinner, Alert, AlertIcon} from '@chakra-ui/react'
import fetch from 'cross-fetch'
import {useParams} from 'react-router-dom'
import {getAppOrigin} from '@salesforce/pwa-kit-react-sdk/utils/url'
import {useAccessToken} from '@salesforce/commerce-sdk-react'


const LoyaltyDetails = () => {
    const [loyalty, setLoyalty] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {getTokenWhenReady} = useAccessToken()
    const params = useParams()
    // Use the value in id as the customerId if provided
    const customerId = (params && params.id) ? params.id : 'customer1'


    useEffect(() => {
        const getLoyaltyDetails = async () => {
            try {
                const token = await getTokenWhenReady()
                const response = await fetch(
                    `${getAppOrigin()}/mobify/proxy/api/custom/loyalty-info/v1/organizations/{YourOrganizationId}/customers?c_customer_id=${customerId}&siteId={YourSiteId}&locale=en-US`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )


                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }


                const data = await response.json()
                setLoyalty(data)
            } catch (err) {
                setError(err.message || 'Failed to load loyalty details')
            } finally {
                setLoading(false)
            }
        }


        getLoyaltyDetails()
    }, [getTokenWhenReady, customerId])


    if (loading) {
        return (
            <Box p={4}>
                <Spinner />
                <Text mt={2}>Loading loyalty details...</Text>
            </Box>
        )
    }


    if (error) {
        return (
            <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
            </Alert>
        )
    }


    return (
        <Box p={4} bg="gray.50" borderRadius="xl" boxShadow="md" maxW="md">
            <Text fontSize="xl" fontWeight="semibold" mb={2}>
                Loyalty Status
            </Text>
            <Box>
                <Text><strong>Points:</strong> {loyalty.points}</Text>
                <Text><strong>Tier:</strong> {loyalty.tier}</Text>
            </Box>
        </Box>
    )
}


export default LoyaltyDetails
