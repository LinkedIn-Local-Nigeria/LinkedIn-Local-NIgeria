import { Studio } from "sanity";
import config from "../sanity/sanity.config";
import { memo } from "react";

const SanityStudio = () => {
  return <Studio config={config} id="sanity-studio" />;
};

export default memo(SanityStudio);
