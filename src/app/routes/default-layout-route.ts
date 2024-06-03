    import { Route, RouterModule, Routes } from '@angular/router';

    export const DefaultRoutes: Routes = [
        {
            path: '',
            loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
        }
      
    
    ]