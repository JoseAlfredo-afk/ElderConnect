import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

    const token = localStorage.getItem('token');

    if (!token || req.url.includes('/authenticate')) {
        return next(req);
    }

    const requestWithToken = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(requestWithToken);
};