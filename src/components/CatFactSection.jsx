import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactSection = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Cat Fact
          <Button variant="outline" size="icon" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Loading fun cat fact...</p>
        ) : error ? (
          <p className="text-red-500">Error loading cat fact: {error.message}</p>
        ) : (
          <p className="text-gray-700">{data?.fact}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CatFactSection;