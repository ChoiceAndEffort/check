import { range, filter, map, Subject, debounce, interval } from 'rxjs';

const subject = new Subject<number>()

let count = 0
setInterval(() => {
    count++
    if (count < 30)
        subject.next(Date.now())
}, 100)

subject.pipe(
    debounce(() => interval(500))
).subscribe((data) => console.log(data))