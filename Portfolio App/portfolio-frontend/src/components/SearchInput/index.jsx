import Div from "../Div";
import SearchWidget from "../Widget/SearchWidget";

export default function SearchInput() {
  return (
    <>
      <Div className="cs-search_container cs-radius_7">
        <SearchWidget 
          placeholder="Search portfolio tags.."
          />
      </Div>
    </>
  )
}
