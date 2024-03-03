import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Head from "next/head";
import Layout from "../../components/Layout";
import Spacing from "../../components/Spacing";
import Cta from "../../components/Cta";
import Div from "../../components/Div";
import { useRouter } from "next/router";
import grapesjs from "grapesjs";
import plugin from "grapesjs-blocks-basic";
import { getPageByUserId, updatePage } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Editor = () => {
  useAuth();

  const [editor, setEditor] = useState(null);
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibility, setVisibility] = useState("unpublished");
  const [slug, setSlug] = useState("");
  const router = useRouter();
  const { pageId } = router.query;

  useEffect(() => {
    const fetchPageAndInitEditor = async () => {
      setIsLoading(true);
      try {
        const data = await getPageByUserId();
        if (data) {
          setPage(data);
          setVisibility(data.visibility);
          setSlug(data.slug);
          const editor = grapesjs.init({
            container: "#editor",
            plugins: [plugin],
            pluginOpts: {
              [plugin]: {},
            },
            components: data.content.components || "",
            style: data.content.styles || "",
          });
          editor.setComponents(data.content.html || "");
          editor.setStyle(data.content.css || "");
          setEditor(editor);
        } else {
          setError("Failed to load page data");
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        setError("Failed to fetch page");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageAndInitEditor();

    return () => editor?.destroy();
  }, [pageId]);

  const handleSave = async () => {
    if (editor && page) {
      const html = editor.getHtml();
      const css = editor.getCss();
      const components = JSON.stringify(editor.getComponents());
      const styles = JSON.stringify(editor.getStyle());

      const content = { html, css, components, styles };

      try {
        const updatedPage = await updatePage(page._id, {
          name: page.name,
          content,
          visibility,
          slug,
        });

        console.log("Page saved successfully:", updatedPage);
        toast.success("Page saved successfully.");
      } catch (error) {
        console.error("Failed to save page:", error);
        toast.error("Failed to save page. Please try again.");
      }
    } else {
      toast.error(
        "Editor or page data is not loaded properly. Please refresh and try again."
      );
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const url = `${protocol}//${host}/portfolio/${slug}`;
      navigator.clipboard.writeText(url).then(
        () => {
          toast.success("URL copied to clipboard!");
        },
        () => {
          toast.error("Failed to copy URL. Please try manually.");
        }
      );
    } else {
      console.error("Cannot execute this function server-side.");
    }
  };

  return (
    <>
      <Head>
        <title>Home - Pixel Projects</title>
        <meta
          name="description"
          content="Create your personalized portfolio with Pixel Projects today."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Spacing lg="100" md="100" />
      <Cta
        title={page?.name}
        bgSrc="/images/cta_bg_2.jpeg"
        variant="rounded-0"
      />
      <Layout>
        <div>
          <style jsx global>{`
            body {
              margin: 0;
              padding: 0;
            }

            html {
              overflow: scroll;
              overflow-x: hidden;
              -ms-overflow-style: none;
              scrollbar-width: none;
            }

            html::-webkit-scrollbar {
              display: none;
            }
            #editor {
              height: 100vh;
            }
          `}</style>
          <Spacing lg="20" md="10" />
          <Div className="container">
            <Div className="row">
              <Div className="col-lg-6">
                <label className="cs-primary_color" htmlFor="visibility">
                  Set Visibility:
                </label>
                <select
                  className="cs-form_field"
                  id="visibility"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  <option className="cs-secondary_color" value="published">
                    Published
                  </option>
                  <option className="cs-secondary_color" value="unpublished">
                    Unpublished
                  </option>
                </select>
              </Div>
              <Div className="col-lg-6">
                <label className="cs-primary_color" htmlFor="slug">
                  Create Slug:
                </label>
                <input
                  className="cs-form_field"
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </Div>
            </Div>
            <Spacing lg="20" md="10" />
            <Div className="row">
              <Div className="col-sm-6">
                <button className="cs-btn cs-style1" onClick={handleSave}>
                  <span className="cs-normal">Save Portfolio</span>
                  <Icon icon="bi:arrow-right" />
                </button>
              </Div>
              <Div className="col-sm-6">
                <button className="cs-btn cs-style1" onClick={handleShare}>
                  <span className="cs-normal">Share Portfolio</span>
                  <Icon icon="bi:arrow-right" />
                </button>
              </Div>
            </Div>
          </Div>
          <Spacing lg="40" md="20" />
          <div className="App">
            <div id="editor"></div>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Editor;
