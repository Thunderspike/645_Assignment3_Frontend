import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';

const retryErrorMessage = (maxRetry: number) =>
    `Tried to load Resource over XHR for ${maxRetry} times without success. Giving up.`;

export function delayedRetry(delayMs = 500, maxRetry = 3) {
    let retries = maxRetry;

    return (src: Observable<any>) =>
        src.pipe(
            retryWhen((errors: Observable<any>) =>
                errors.pipe(
                    delay(delayMs),
                    mergeMap((error) =>
                        retries-- > 0
                            ? of(error)
                            : throwError(retryErrorMessage(maxRetry))
                    )
                )
            )
        );
}
