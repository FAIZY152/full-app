import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX, Home } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type SearchType = {
  searchTxt?: string;
};

const NoResultsFound: React.FC<SearchType> = ({ searchTxt = "" }) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center space-y-4 text-center p-6">
        <SearchX className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold tracking-tight">No Results Found</h2>
        <p className="text-muted-foreground">
          We couldn&apos;t find what you&apos;re looking for{" "}
          <span className="text-lg font-bold ">{searchTxt}</span>. Please try a
          different search or browse our categories.
        </p>
        <Button
          asChild
          className="mt-4 bg-[#9D174D] text-white hover:bg-[#ca8da5]"
        >
          <Link to={"/"}>
            <Home className="mr-2 h-4 w-4" />
            Go Back Home
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoResultsFound;
