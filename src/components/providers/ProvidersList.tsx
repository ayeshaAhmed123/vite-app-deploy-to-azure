
import { Provider } from "@/types";
import { ProviderCard } from "./ProviderCard";
import { ProvidersEmptyState } from "./ProvidersEmptyState";
import { ProvidersLoadingState } from "./ProvidersLoadingState";
import { ProvidersSortBar } from "./ProvidersSortBar";
import { mockProviders } from "@/data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
interface ProvidersListProps {
  providers: Provider[];
  loading: boolean;
  onSortChange?: (sortBy: string) => void;
}

export const ProvidersList = ({ providers, loading, onSortChange }: ProvidersListProps) => {
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();
  const { SearchProvidersFromOctansServiceData, isSearchProvidersFromOctansServiceDataLoading } = useSelector((state: any) => state.SearchProvidersFromOctansService);
  if (loading) {
    return <ProvidersLoadingState />;
  }

  if (providers.length === 0) {
    return <ProvidersEmptyState />;
  }
  const mockData = mockProviders
  return (
    <div>
      <ProvidersSortBar count={providers.length} onSortChange={onSortChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  {isSearchProvidersFromOctansServiceDataLoading ? (
    <div className="col-span-full flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  ) : (
    providers?.map((provider, index) => (
      <ProviderCard
        key={provider.id}
        provider={provider}
        image={mockData[index]?.image}
      />
    ))
  )}
</div>
    </div>
  );
};
