import '@styles/globals.css';
import Nav from "@components/Nav"
import Provider from '@components/Provider';
import ChatButton from '@components/ChatButtom';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share Prompts"
}

const RootLayout = ({children}) =>{
    return(
        <html lang='en'>
            <body>
                <Provider>
                <div className='main'>
                    <div className='gradient'/>
                </div>

                <main className='app'>
                    <Nav/>
                    <ChatButton/>
                    {/* <div style={{position:"fixed",bottom:"0",right:"0",width:"50px",height:"50px",borderRadius:"50%",backgroundColor:"black",margin:"15px"}}></div> */}
                    {children}
                </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout;