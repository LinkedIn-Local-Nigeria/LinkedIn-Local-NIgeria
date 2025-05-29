import {  Studio } from "sanity";
import config from "../sanity/sanity.config"

const SanityStudio = () => {
  return (
    <Studio config={config} id={'app'} />
  )
}

export default SanityStudio
