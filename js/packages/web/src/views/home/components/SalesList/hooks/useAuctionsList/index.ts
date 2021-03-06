import { useMemo } from 'react';
import { useWallet } from '@safecoin/wallet-adapter-react';

import { useAuctions, AuctionView } from '../../../../../../hooks';

import { LiveAuctionViewState } from '../..';
import { getFilterFunction, resaleAuctionsFilter } from './utils';

export const useAuctionsList = (
  activeKey: LiveAuctionViewState,
): { auctions: AuctionView[]; hasResaleAuctions: boolean } => {
  const { publicKey } = useWallet();
  const auctions = useAuctions();

  const filteredAuctions = useMemo(() => {
    const filterFn = getFilterFunction(activeKey);

    return auctions.filter(auction => filterFn(auction, publicKey));
  }, [activeKey, auctions, publicKey]);

  const hasResaleAuctions = useMemo(() => {
    return auctions.some(auction => resaleAuctionsFilter(auction));
  }, [auctions]);

  return { auctions: filteredAuctions, hasResaleAuctions };
};
