import { Icon } from '@iconify/react'
import React from 'react'

export default function SearchWidget({placeholder}) {
  return (
    <>
      <form className="cs-sidebar_search">
        <input type="text" placeholder={placeholder} />
        <button className="cs-sidebar_search_btn">
          <Icon icon="material-symbols:search-rounded" />                   
        </button>
      </form>
    </>
  )
}
