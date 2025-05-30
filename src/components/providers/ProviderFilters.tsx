
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getOptionsArray } from "@/shared/utils/utils";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { appServices } from "@/shared/redux/actions/appServices";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

export const ProviderFilters = ({ onFilterChange }: FiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [serviceType, setServiceType] = useState("");
  const { eSamAddressData, iseSamAddressDataLoading } = useSelector((state: any) => state.eSamAddress);
  const { eSAMGetByIDData } = useSelector((state: any) => state.eSAMGetByID);
  const { GetOctansServicesData } = useSelector((state: any) => state.GetOctansServices);
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [applyfilter, setApplyFilter] = useState();
  const [filters, setFilters] = useState({
    keyword: "",
    service: "",
    location: "",
    availability: [],
    rating: "",
  });

  const [filteredProviders, setFilteredProviders] = useState<any[]>([]); // State for filtered providers
  
  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
    filterProviders(updatedFilters); // Apply the filter when filter changes
  };

  const handleCheckboxChange = (key: string, value: string) => {
    const currentValues = filters[key as keyof typeof filters] as string[];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    
    handleFilterChange(key, updatedValues);
  };

  const clearFilters = () => {
    const resetFilters = {
      keyword: "",
      service: "",
      location: "",
      availability: [],
      rating: "",
    };

    setFilters(resetFilters);
    onFilterChange(resetFilters);
    setFilteredProviders([]); // Reset filtered providers when clearing filters
  };

  const filterProviders = (filters: any) => {
    // Filter logic for providers (assuming you have a list of providers)
    const allProviders = []; // Assume you have all the providers data here
    
    const filtered = allProviders.filter((provider: any) => {
      let matches = true;

      // Filter based on keyword
      if (filters.keyword && !provider.name.toLowerCase().includes(filters.keyword.toLowerCase())) {
        matches = false;
      }

      // Filter based on service
      if (filters.service && provider.service !== filters.service) {
        matches = false;
      }

      // Filter based on location
      if (filters.location && provider.location !== filters.location) {
        matches = false;
      }

      // Filter based on availability
      if (filters.availability.length > 0 && !filters.availability.some((availability: string) => provider.availability.includes(availability))) {
        matches = false;
      }

      // Filter based on rating
      if (filters.rating && provider.rating < parseInt(filters.rating)) {
        matches = false;
      }

      return matches;
    });

    setFilteredProviders(filtered); // Update filteredProviders state
  };

  useEffect(() => {
    dispatch(appServices.GetOctansServices());
  }, [dispatch]);

  useEffect(() => {
    if (GetOctansServicesData) {
      const options = getOptionsArray(
        GetOctansServicesData,
        "octansServiceName",
        "octansServiceID"
      );
      setServiceTypeOptions(options);
    }
  }, [GetOctansServicesData]);

  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    e.preventDefault();
    setLocationInput(query);
    setIsPopoverOpen(true);
    dispatch(appServices.eSamAddress(query));
  };

  const handleLocationSelect = (uniqueId: string, fullAddress: string) => {
    setSelectedLocationId(uniqueId);
    setSelectedLocationName(fullAddress);
    setLocationInput(fullAddress);
    setIsPopoverOpen(false);
    dispatch(appServices.eSAMGetByID({ uniqueId }));
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (eSamAddressData && eSamAddressData.length > 0) {
        handleLocationSelect(
          eSamAddressData[0].uniqueId,
          eSamAddressData[0].fullAddress
        );
      }
    }
  };

  useEffect(() => {
    if (selectedLocationId && serviceType && eSAMGetByIDData) {
      const obj = {
        OctansServiceID: serviceType,
        Latitude: eSAMGetByIDData?.nzgD2KYCoord,
        Longitude: eSAMGetByIDData?.nzgD2KXCoord,
      };
      dispatch(appServices.GetLocationFromOctansService(obj));
    }
  }, [selectedLocationId, serviceType, eSAMGetByIDData]);

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Mobile Filters Trigger */}
      <div className="md:hidden p-4 border-b">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={18} />
            Filters
          </span>
          <span className="bg-health-100 text-health-600 px-2 py-0.5 rounded text-xs">
            {Object.values(filters).flat().filter(Boolean).length}
          </span>
        </Button>
      </div>

      {/* Desktop Filters / Mobile Expanded Filters */}
      <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block p-5`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Filter Results</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-0 text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search providers"
              value={filters.keyword}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && filterProviders(filters)} // Trigger filtering on Enter
              className="pl-10"
            />
          </div>
        </div>

        <Accordion type="multiple" defaultValue={["service", "location", "availability"]}>
          {/* Location */}
          <AccordionItem value="location">
            <AccordionTrigger>Location</AccordionTrigger>
            <AccordionContent>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      placeholder="Search for a location"
                      className="pl-10"
                      value={locationInput}
                      onChange={handleLocationInputChange}
                      onKeyDown={handleLocationKeyDown}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[300px] max-h-[250px] overflow-y-auto" style={{ backgroundColor: 'white' }} align="start">
                  {iseSamAddressDataLoading ? (
                    <div className="py-2 px-3 text-center">
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                      <span className="text-sm text-muted-foreground mt-1">Searching...</span>
                    </div>
                  ) : eSamAddressData && eSamAddressData.length > 0 ? (
                    <div>
                      {eSamAddressData.map((location: any) => (
                        <div
                          key={location.uniqueId}
                          className="flex flex-col py-2 px-3 hover:bg-muted cursor-pointer"
                          onClick={() => handleLocationSelect(location.uniqueId, location.fullAddress)}
                        >
                          <span className="font-medium">{location.fullAddress}</span>
                        </div>
                      ))}
                    </div>
                  ) : locationInput.trim().length > 0 ? (
                    <div className="py-2 px-3 text-center">
                      <span className="text-sm text-muted-foreground">No locations found</span>
                    </div>
                  ) : null}
                </PopoverContent>
              </Popover>
            </AccordionContent>
          </AccordionItem>

          {/* Service */}
          <AccordionItem value="service">
            <AccordionTrigger>Service</AccordionTrigger>
            <AccordionContent>
              <Select
                value={filters.service}
                onValueChange={(value) => handleFilterChange("service", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypeOptions.map((option: any) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>

          {/* Availability */}
          <AccordionItem value="availability">
            <AccordionTrigger>Availability</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="open-now"
                    checked={filters.availability.includes("open-now")}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("availability", "open-now");
                    }}
                  />
                  <label htmlFor="open-now" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Open now
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="available-today"
                    checked={filters.availability.includes("available-today")}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("availability", "available-today");
                    }}
                  />
                  <label htmlFor="available-today" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Available today
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="next-48-hours"
                    checked={filters.availability.includes("next-48-hours")}
                    onCheckedChange={(checked) => {
                      handleCheckboxChange("availability", "next-48-hours");
                    }}
                  />
                  <label htmlFor="next-48-hours" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Next 48 hours
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating */}
          <AccordionItem value="rating">
            <AccordionTrigger>Rating</AccordionTrigger>
            <AccordionContent>
              <Select
                value={filters.rating}
                onValueChange={(value) => handleFilterChange("rating", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select minimum rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="2">2+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Mobile Apply Filters Button */}
        <Button
          className="w-full mt-6 md:hidden"
          onClick={() => setIsFiltersOpen(false)}
        >
          Apply Filters
        </Button>
      </div>

      {/* No providers message */}
      {filteredProviders.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">
          <span>No providers available</span>
        </div>
      )}

      {/* Display filtered results */}
      <div>
        {filteredProviders.length > 0 && (
          <div>
            {/* Display the filtered providers here */}
          </div>
        )}
      </div>
    </div>
  );
};
