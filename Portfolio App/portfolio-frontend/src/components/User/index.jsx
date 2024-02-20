import Div from "../Div"

export default function UserDetails({ username, userStatement, profileImg }) {
  return (
    <>
      <Div className="cs-user_detail_container cs-radius_7">
        <Div
          className="cs-bg cs-user_profile_img cs-radius_15"
          style={{ backgroundImage: `url(${profileImg})`}}
        />
        <Div>
          <h2>@{username}</h2>
          <p>{userStatement}</p>
        </Div>
      </Div>
    </>
  )
}


