const LoyaltyCard = () => {
    const headingRef = useRef(null)
    return (
        <ToggleCard
            id="loyalty"
            title={
                <Skeleton ref={headingRef} tabIndex="-1" height="30px" width="120px">
                <FormattedMessage defaultMessage="Loyalty" id="loyalty_card.title.loyalty" />
                </Skeleton>
            }
            layerStyle="cardBordered"
        >
        <ToggleCardSummary>
            <SimpleGrid columns={{base: 1, lg: 3}} spacing={4}>
                <Box>
                    <Skeleton height="21px" width="84px" marginBottom={2}>
                    <Text fontSize="sm" fontWeight="bold">
                        <FormattedMessage
                            defaultMessage="Loyalty"
                            id="loyalty_card.label.loyalty"
                        />
                    </Text>
                    </Skeleton>
                    <Skeleton height="21px" width="140px">
                        <Text fontSize="sm">
                            <LoyaltyDetails />
                        </Text>
                    </Skeleton>
                </Box>
            </SimpleGrid>
        </ToggleCardSummary>
        </ToggleCard>
    )
}