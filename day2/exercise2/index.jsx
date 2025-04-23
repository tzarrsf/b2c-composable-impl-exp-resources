import React from 'react'
import fetch from 'cross-fetch'
import {useQuery} from '@tanstack/react-query'
import {useParams} from 'react-router-dom'
import {getAppOrigin} from '@salesforce/pwa-kit-react-sdk/utils/url'
import {
 useAccessToken
} from '@salesforce/commerce-sdk-react'

const LoyaltyDetails = () => {
 const params = useParams()
 const {getTokenWhenReady} = useAccessToken()

 const {data, error, isLoading} = useQuery({
 queryKey: [params.id],
 queryFn: async () => {
 const token = await getTokenWhenReady()
 return fetch(`${getAppOrigin()}/mobify/proxy/api/custom/loyalty-info/v1/organizations/{OrgID}/customers?c_customer_id=customer1&siteId={siteID}&locale=en-US`, {
 method: 'GET',
 headers: {
 Authorization: `Bearer ${token}`
 }
 }).then(res=>res.json()).then((json) => {
 console.log(json)
 return json
 })
 },
 })
 if (isLoading) {
 return <div>Loading...</div>
 }
 else if (error) {
 return <div>{data.fault.message}</div>
 }
 else {
 return <div dangerouslySetInnerHTML={{__html: 'Tier: ' + data.tier + '<br /> Points: ' + data.points}} />
 }
}

LoyaltyDetails.getTemplateName = () => 'loyalty-details'

export default LoyaltyDetails