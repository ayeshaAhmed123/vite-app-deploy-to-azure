
import { useState } from "react";
import { Provider } from "@/types";
import { ProvidersEmptyState } from "./ProvidersEmptyState";
import { ProvidersLoadingState } from "./ProvidersLoadingState";
import { Button } from "@/components/ui/button";

interface ProvidersMapProps {
  providers: Provider[];
  loading: boolean;
}

export const ProvidersMap = ({ providers, loading }: ProvidersMapProps) => {
  const [mapboxApiKey, setMapboxApiKey] = useState<string>("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  if (loading) {
    return <ProvidersLoadingState />;
  }

  if (providers.length === 0) {
    return <ProvidersEmptyState />;
  }

  if (showApiKeyInput) {
    return (
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-3">Map View</h3>
        <p className="text-muted-foreground mb-4">
          To view providers on a map, please enter your Mapbox API key. You can get a free API key from{" "}
          <a 
            href="https://mapbox.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            mapbox.com
          </a>.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="mapbox-key" className="block text-sm font-medium mb-1">
              Mapbox API Key
            </label>
            <input
              id="mapbox-key"
              type="text"
              value={mapboxApiKey}
              onChange={(e) => setMapboxApiKey(e.target.value)}
              placeholder="pk.eyJ1IjoieW91..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button 
            onClick={() => setShowApiKeyInput(false)} 
            disabled={!mapboxApiKey.trim().length}
            className="w-full"
          >
            Load Map
          </Button>
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> In a production environment, API keys should not be entered by users. 
            Ideally, the application would use environment variables or secure backend services to store and retrieve API keys.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden border shadow-md bg-white">
      <div className="p-4 border-b bg-blue-50 flex justify-between items-center">
        <h3 className="font-medium">Providers Near You</h3>
        <span className="text-sm text-muted-foreground">Showing {providers.length} providers</span>
      </div>
      
      <div className="aspect-[3/2] bg-gray-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder for actual map integration */}
          <div className="text-center p-6">
            <p className="text-lg font-medium mb-2">Map Integration</p>
            <p className="text-muted-foreground mb-4">
              In a real application, this would be an interactive map showing provider locations.
            </p>
            <Button onClick={() => setShowApiKeyInput(true)} variant="outline">
              Change API Key
            </Button>
          </div>
        </div>
        
        {/* Provider List alongside map */}
        <div className="absolute top-3 right-3 bottom-3 w-64 bg-white rounded-md shadow-lg overflow-y-auto p-3">
          <h4 className="font-medium mb-3 text-sm">Nearby Providers</h4>
          
          <div className="space-y-2">
            {providers.slice(0, 5).map(provider => (
              <div key={provider.id} className="p-2 bg-blue-50 rounded-md hover:bg-blue-100 cursor-pointer">
                <div className="font-medium text-sm">{provider.name}</div>
                <div className="text-xs text-muted-foreground">{provider.address}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};