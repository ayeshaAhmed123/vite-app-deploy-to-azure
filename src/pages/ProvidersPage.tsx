
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProviderFilters } from "@/components/providers/ProviderFilters";
import { ProvidersList } from "@/components/providers/ProvidersList";
import { Provider } from "@/types";
import { mockProviders } from "@/data/mockData";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Grid2X2, List, Map, ChevronLeft } from "lucide-react";
import { ProvidersMap } from "@/components/providers/ProvidersMap";
import { ProvidersListView } from "@/components/providers/ProvidersListView";
import { useQuery } from "@/shared/hooks/useQuery";
import { appServices } from "@/shared/redux/actions/appServices";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const ProvidersPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = useQuery()
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();
  const { SearchProvidersFromOctansServiceData, isSearchProvidersFromOctansServiceDataLoading } = useSelector((state: any) => state.SearchProvidersFromOctansService);
  const locationParam = searchParams.get("location");
  const serviceParam = searchParams.get("service");
  
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "map" | "list">("grid");


  useEffect(() => {
    // Simulate API call
    let obj = {
      PracticeID: query.get("practice"),
      PracticeLocationID: query.get("location"),
      octansServiceID: query.get("service"),
      ProviderID: ""
    }
    dispatch(appServices?.SearchProvidersFromOctansService(obj))
    // setTimeout(() => {
    //   setProviders(mockProviders);
    //   setLoading(false);
    // }, 500);
  }, []);

  useEffect(() => {
    if(SearchProvidersFromOctansServiceData){
      // let arr = {...SearchProvidersFromOctansServiceData}
      // arr[arr.length] = mockProviders[0] 
      setProviders(SearchProvidersFromOctansServiceData);
      // setProviders(mockProviders);
      setLoading(false);
    }
  }, [SearchProvidersFromOctansServiceData])
  
  
  // useEffect(() => {
  //   if (providers.length) {
  //     let filtered = [...providers];
      
  //     // Apply any URL filters
  //     if (locationParam) {
  //       filtered = filtered.filter(provider => 
  //         provider.city.toLowerCase().includes(locationParam.toLowerCase())
  //       );
  //     }
      
  //     if (serviceParam) {
  //       filtered = filtered.filter(provider => 
  //         provider.services.some(service => 
  //           service.toLowerCase().includes(serviceParam.toLowerCase())
  //         )
  //       );
  //     }
      
  //     // Apply sorting
  //     if (sortBy === "rating_high_to_low") {
  //       filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  //     }
      
  //     setFilteredProviders(filtered);
  //   }
  // }, [providers, locationParam, serviceParam, sortBy]);
  
  const handleFilterChange = (filters: any) => {
    let filtered = [...providers];
    
    // Apply keyword search
    if (filters.keyword) {
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        provider.services.some(service => 
          service.toLowerCase().includes(filters.keyword.toLowerCase())
        )
      );
    }
    
    // Apply service filter
    if (filters.service) {
      filtered = filtered.filter(provider => 
        provider.services.some(service => 
          service.toLowerCase().includes(filters.service.toLowerCase())
        )
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(provider => 
        provider.city.toLowerCase() === filters.location.toLowerCase()
      );
    }
    
    // Apply availability filters
    if (filters.availability.length > 0) {
      if (filters.availability.includes("open-now")) {
        filtered = filtered.filter(provider => provider.isOpen);
      }
    }
    
    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(provider => 
        provider.rating >= parseInt(filters.rating)
      );
    }
    
    setFilteredProviders(filtered);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // const handleGoBack = () => {
  //   navigate(-1);
  // };
  
  return (
    <Layout>
      <section className="bg-muted/30 py-12">
        <div className="container">
          {/* <div className="flex items-center mb-4">
            <Button 
              variant="ghost" 
              onClick={handleGoBack}
              size="sm"
              className="mr-2"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
          </div> */}
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">Healthcare Providers</h1>
            <p className="text-muted-foreground">
              Find and book appointments with healthcare providers in your area
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <div className="inline-flex bg-blue-100 rounded-md">
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`${viewMode === "grid" ? "bg-blue-600" : "bg-transparent text-blue-600 hover:bg-blue-50"}`}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("list")}
                className={`${viewMode === "list" ? "bg-blue-600" : "bg-transparent text-blue-600 hover:bg-blue-50"}`}
              >
                <List className="h-4 w-4" />
              </Button>
              {/* <Button 
                variant={viewMode === "map" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("map")}
                className={`${viewMode === "map" ? "bg-blue-600" : "bg-transparent text-blue-600 hover:bg-blue-50"}`}
              >
                <Map className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProviderFilters onFilterChange={handleFilterChange} />
            </div>
            
            <div className="lg:col-span-3">
              {viewMode === "grid" && (
                <ProvidersList 
                  providers={filteredProviders?.length>0? filteredProviders : providers}
                  loading={loading}
                  onSortChange={handleSortChange}
                />
              )}

              {/* {viewMode === "map" && (
                <ProvidersMap 
                providers={filteredProviders?.length>0? filteredProviders : providers}
                  loading={loading}
                />
              )} */}

              {viewMode === "list" && (
                <ProvidersListView 
                providers={filteredProviders?.length>0? filteredProviders : providers}
                  loading={loading}
                  onSortChange={handleSortChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProvidersPage;
