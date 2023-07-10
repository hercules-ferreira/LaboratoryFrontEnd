import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsResult } from "next";
import { parseCookies } from "nookies";

//função páginas para visistantes
export function canSSRGuest <P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    
    const cookies = parseCookies(ctx)
    // se a pessoa tentar acessar a página, tendo um login salvo,, será redirecionado 
    if(cookies['@nextauth.token']){
        return{
            redirect: {
                destination: '/dashboard', 
                permanent: false, 
            }
        }
    } 
    
    return await fn(ctx);
    

    }

}



