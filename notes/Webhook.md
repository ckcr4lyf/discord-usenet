Webhooks can be used to send attachments as well, meaning we don't need a bot to be logged in

We could probably get rid of discord.js lib entirely, and make it much easier

E.g. with cURL:

```
# Set webhook URL
export WEBHOOK_URL="https://discord.com/api/webhooks/1078880510438289438/Bm1_gXlnv2C8DHXJifMkIieVU5YkVxqm5bUnCONUxrj6Ln2uFQG4615JeIs-Pqzv9uE5"

# Generate 1MB of random data (test)

dd if=/dev/urandom of=file_1.bin bs=1M count=1
dd if=/dev/urandom of=file_3.bin bs=1M count=1

# Upload via cURL

curl -v \
-F "file1=@file_1.bin" \
-F "file4=@file_3.bin" \
$WEBHOOK_URL
```