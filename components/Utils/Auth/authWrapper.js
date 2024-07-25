import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isUserAuthenticated } from './userAuth';

export const AuthWrapper = (WrappedComponent) => {
    const Wrapper = (props) => {
        const router = useRouter();

        useEffect(() => {
            if (!isUserAuthenticated() && typeof window !== 'undefined') {
                router.push('/authentication/signin');
            };
        }, [isUserAuthenticated, router]);

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default AuthWrapper;
