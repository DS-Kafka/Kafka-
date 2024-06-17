import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const errorCount = new Counter('errors');

export const options = {
    stages: [
        { duration: '10s', target: 10000 }, // ramp-up to 20 users over 10 seconds
        { duration: '10s', target: 10000 }, // stay at 20 users for 30 seconds
        { duration: '10s', target: 0 },  // ramp-down to 0 users over 10 seconds
    ],
    thresholds: {
        errors: ['count<1'], // errors should be 0
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    },
};

export default function () {
    const url = 'http://ds_backend:3000/api/purchase';
    const payload = JSON.stringify({
        name: `User_${__VU}_${__ITER}`,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    console.log(`Sending payload: ${payload}`);

    const res = http.post(url, payload, params);

    console.log(`Response status: ${res.status}`);
    console.log(`Response body: ${res.body}`);

    const success = check(res, {
        'status is 200': (r) => r.status === 200,
    });

    if (!success) {
        errorCount.add(1);
    }


}
