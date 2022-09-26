import "../styles/globals.css"
import "antd/dist/antd.css"
import type { AppProps } from "next/app"
import { FunctionComponent } from "react"

const MyApp: FunctionComponent<AppProps> = (props: AppProps) => {
  return <props.Component {...props.pageProps} />
}

export default MyApp
