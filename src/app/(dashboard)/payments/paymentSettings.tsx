import { useState, useEffect, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PricePerSeasonForm() {
  const [naira, setNaira] = useState("");
  const [dollar, setDollar] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // loading state for fetching existing price

  // Fetch existing price on mount
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.citadel-i.com.ng/api/v1/admin/get_pricing",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();

        if (res.ok && data?.data) {
          setNaira(data.data.price_per_season_in_naira);
          setDollar(data.data.price_per_season_in_dollar);
        }
      } catch (err) {
        console.error("Error fetching price:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchPrice();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://api.citadel-i.com.ng/api/v1/admin/update_pricing",
        {
          method: "PUT", // Upsert: create if not exists, update if exists
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            price_per_season_in_naira: Number(naira),
            price_per_season_in_dollar: Number(dollar),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Something went wrong");
        setLoading(false);
        return;
      }

      alert(data?.message || "Price saved successfully");
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p>Loading price data...</p>;

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Price Per Season</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label>Price per Season (₦)</Label>
            <Input
              type="number"
              placeholder="e.g 150000"
              value={naira}
              onChange={(e) => setNaira(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label>Price per Season ($)</Label>
            <Input
              type="number"
              placeholder="e.g 120"
              value={dollar}
              onChange={(e) => setDollar(e.target.value)}
              required
            />
          </div>
 {/* {dollar!=='' && naira!==''  && (
          <div className="p-4 bg-gray-100 rounded-md">
            <p className="font-medium">Amount to Pay:</p>
            <p>₦{amount.toLocaleString()} / ${ (amount / USD_RATE).toFixed(2) }</p>
            <p className="text-sm text-gray-600">*Monthly Payment</p>
          </div>
        )} */}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Price"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
