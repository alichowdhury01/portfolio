export default  {
  port: `1337`,
  origin: 'origin',
  dbUri: `mongodb+srv://alichowdhury:Mouri123!@bd1.gm4lics.mongodb.net/?retryWrites=true&w=majority&appName=bd1`,
  collectionName: `MVPS`,
  saltWorkFactor: 10,
  accessTokenTtl: "120m",
  refreshTokenTtl: "1y",
  publicKey: `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyTkZxOW1WcW5XVFRHVmNiQnllYwpxZklPRTJiWkM3dEM5aG40OHlKQ1RPcnJBZnpaOUpxKzFvTUtMQlIwTmttSG9QZGZ2S0JQckVnQkdqREpWOUVxClpjS0NNYXZ0T3hNR1hhK2dJbVhSNEJRZGJINmt1NFRtYkQvUjcrMzJJVC83c3JYdGt1eXpINy8wL1lUS3ZvOWkKNFBKRk1NRTNUQ01PckJxbkFvdWtJU2pNWW5rM1NGU25xVDAyMlFZSUNNVmlSNzVjRXh6cUV0dEVHTG5vZk1GSwpxN3MzZEtoY2RCbFJNbU5ZdjlWWXJYZkNQTFlRU081MXFWcnB4WmhDWlBYZE9QOXpTSzJGQlNSbmFhK3N5RVBzCmhPK2JmWXA2RElRQVpzdGI5SEY3YnhKemFCTVN3aXY3YkVEZnQ2Sjk5eEMzQUJWUmt2aDJIQytSQ2ptWnBqVTQKTndJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t`,
  privateKey: `LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb2dJQkFBS0NBUUVBck5GcTltVnFuV1RUR1ZjYkJ5ZWNxZklPRTJiWkM3dEM5aG40OHlKQ1RPcnJBZnpaCjlKcSsxb01LTEJSME5rbUhvUGRmdktCUHJFZ0JHakRKVjlFcVpjS0NNYXZ0T3hNR1hhK2dJbVhSNEJRZGJINmsKdTRUbWJEL1I3KzMySVQvN3NyWHRrdXl6SDcvMC9ZVEt2bzlpNFBKRk1NRTNUQ01PckJxbkFvdWtJU2pNWW5rMwpTRlNucVQwMjJRWUlDTVZpUjc1Y0V4enFFdHRFR0xub2ZNRktxN3MzZEtoY2RCbFJNbU5ZdjlWWXJYZkNQTFlRClNPNTFxVnJweFpoQ1pQWGRPUDl6U0syRkJTUm5hYStzeUVQc2hPK2JmWXA2RElRQVpzdGI5SEY3YnhKemFCTVMKd2l2N2JFRGZ0Nko5OXhDM0FCVlJrdmgySEMrUkNqbVpwalU0TndJREFRQUJBb0lCQUFhb2h1TjVZdE12bUVhSQpxWnpyOU1oRGNERmxMQVdjc0diRTkyZCtzV2svUDlDeXlqNzNXMVR1ZFl6Zk9OOENsRHdxYThEYnVGWWQ3QlR6ClBqNm82MlpDU1R2YXNPZ3V3bmNIbGpiZEQybi92R1o2dHFRVzZiM1A4Nm0zMUZ6UmwwUDZhRzNadXNrRlgwNEoKT0xxQTBjRnk5Q0Y5d0VDcHRSNENaTjdmUEhLZWpJbWM0VzF1Vi9jdjJsaVU1VkYwWk0xTGwvUUJNcDVLdlhlRwpEUm51d1hCM3R4V1BMWGhQWFlxMGwwVHJCRkxTbktFSlQyRFdkcG1LT3hzQlUyY0t1K2pYSGFLdmdFTVBrc3k3CnVrQTI2clZwNWprT2FVamtOUklTVnZ0Q3hhWUUzb0VMRGV0bGZqODZhN0hlT0FiWTR6Rk5PcFBzQXhhV01rb3UKRUFKNGhZRUNnWUVBNGR6RFVIYkNGeHVCci80c3R2aUd5am02RGlxSW5EYTEvelZmRGVPajF2bnhEMU9kV05ndwpwUk4rb3hlNWpFek9vN1k0Vkxabm1MQXF6ZGh1YlhxcXNqY0tPMnRuTDhLTWtIbEdMb1lJc1dWVmc1OGhMK3BFCnlLU2x6NjE5NHVkQ0c0ck5wZ3RMdHMxTHNHeHZJQkZsRW4xaTlDQ0RsRDZoUkVEOW1oalJpVUVDZ1lFQXcrQzIKZ1lDV2xIUXpuWVYxRGxEYlQ1aGVhVkxSRXBuTmZqNzBsK00rS1hVTE1OSUpZNUovSlBjODZ3a2JLbUQ0cVZ2UQpVZ093bHdSQmxWenkxczNrUkJmYXowRUdYUng5Rm5va2MycVE2UGVZR2pTR2RFZWJ5WVg3cTR0cGhHQTRnOS96CnRoSjh2allPaWdGTWhXNVpBa1lHYlNXTHkyWCtKREdHWlg0Z3EzY0NnWUE0S0hMcnc4dDRnVjlhaWdGR01UOGEKY3dYKzFiYUgyTmFoc1B5RWNKQmhPRjRtcUd5Y0ZZenF6cEVUTGlmMWFYZUxueGdjZ0FuOEhmbFdtelRCeGRsQgpYSXdQd0NHMDcxT1I3SVYxdGQvZGM4dXlZVk9ZSFZDaTdzVkhnT1NuRVVjUG9CQ0g4NUVNejdpOUVna0RXUy9mClRBdlpsV2dCNlJ5aDR1THJlTFpJd1FLQmdGTjd4czFUSE5xUTNCN2E3cFQzYVVGM1UyWFlZanRuU2Vud3N4YTUKUjVrcnhXVTlYN3NNaVJ3Y005Nkl0d2RNNVM1cGIxUkZObEpuQWZ6QzdNMFlXNTJaL1N3d0xxSW9yamVTUDA3aApzSGxhYlgxZHZhQjVsTEJEWm93cWt3SlVjRUhraFY2b2FubzNWK01Cd3JkcjNJdlhoSTJvWHZpRnM5ZUJOQ0sxCnF2N3BBb0dBUThwOWl1VnZmNTFjcXJHRHh2emJ5ZG1mY0ZtdmZ2VDBxdktsN0ZjeDdkeEtCZ1daRkpOM3NDb20KUUZhZVNNeUxKTWcrNXFHcGR3dEIwNWNzZjl6RmNQU29yYWFjUW1QTXFnYllYajc0S21pTHBmV2gxTmIxOXFvRgpXb2ljb05NS0FnTVYvS1BQWU54bjloSkZvVlpmWnE0aTVDNEVpWC9FR012VzRMQ2lMZ009Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t`,
  refreshTokenPublicKey: "",

  

};
