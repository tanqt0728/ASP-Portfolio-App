import React, { useState, useEffect } from "react";
import Spacing from "../../components/Spacing";
import { useRouter } from "next/router";
import { getPageBySlug } from "../api/api";

export default function PortfolioDetailsSlug() {
  const router = useRouter();
  const slug = router.query.slug;

  const [pageContent, setPageContent] = useState({
    html: "",
    css: "",
    visibility: "unpublished",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      const fetchPageContent = async () => {
        setIsLoading(true);
        const data = await getPageBySlug(slug);
        if (data && !data.error) {
          setPageContent(data);
        } else {
          setError(data.error || "Failed to load page content");
        }
        setIsLoading(false);
      };

      fetchPageContent();
    }
  }, [slug]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Spacing lg="120" md="100" />
      <style dangerouslySetInnerHTML={{ __html: pageContent.css }} />
      <div dangerouslySetInnerHTML={{ __html: pageContent.html }} />
    </div>
  );
}
