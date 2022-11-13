import { useCallback, useState } from "react";

export const useBuild = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [executeRes, setExecuteRes] = useState({});
  const [queryRes, setQueryRes] = useState({});

  const postBuild = useCallback(async (lessonID, chID, files) => {
    setIsError(false);
    setIsLoading(true);
    setIsSuccess(false);

    let option = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lesson: lessonID,
        chapter: chID,
        files: files,
      }),
    };
    console.log("option.body", option.body);

    try {
      let res = await fetch(
        `${process.env.REACT_APP_API_ADDR}/v1/cosm/build`,
        option
      );
      let data = await res.json();

      if (res.status === 200) {
        setIsSuccess(true);
      } else if (res.status === 400) {
        alert("Try Again!");
      } else if (res.status === 500) {
        setIsError(true);
        setExecuteRes([data.message]);
      }

      setExecuteRes(data.result[0]);
      setQueryRes(data.result[1]);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { postBuild, isSuccess, isError, isLoading, executeRes, queryRes };
};

"files":{"state.rs":"dXNlIHNjaGVtYXJzOjpKc29uU2NoZW1hOwp1c2Ugc2VyZGU6OntEZXNlcmlhbGl6ZSwgU2VyaWFsaXplfTsKCnVzZSBjb3Ntd2FzbV9zdGQ6OntBZGRyLCBVaW50MTI4fTsKdXNlIGN3X3N0b3JhZ2VfcGx1czo6SXRlbTsKCnB1YiB0eXBlIEV4dGVuc2lvbiA9IE1ldGFkYXRhOwoKI1tkZXJpdmUoU2VyaWFsaXplLCBEZXNlcmlhbGl6ZSwgQ2xvbmUsIERlYnVnLCBQYXJ0aWFsRXEsIEpzb25TY2hlbWEpXQpwdWIgc3RydWN0IFN0YXRlIHsKICAgIHB1YiBjb3VudDogaTMyLAogICAgcHViIG93bmVyOiBBZGRyLAp9CgojW2Rlcml2ZShTZXJpYWxpemUsIERlc2VyaWFsaXplLCBDbG9uZSwgRGVidWcsIFBhcnRpYWxFcSwgSnNvblNjaGVtYSldCnB1YiBzdHJ1Y3QgRnJlaWdodCB7CiAgICBwdWIgZGVub206IFN0cmluZywKICAgIHB1YiBhbW91bnQ6IFVpbnQxMjgsCiAgICBwdWIgdW5pdF93ZWlnaHQ6IFVpbnQxMjgsCn0KCi8vIGN1c3RvbSBtZXRhZGF0YSBmb3IgY3c3MjEgZXh0ZW5zaW9uCiNbZGVyaXZlKFNlcmlhbGl6ZSwgRGVzZXJpYWxpemUsIENsb25lLCBEZWJ1ZywgUGFydGlhbEVxLCBKc29uU2NoZW1hKV0KcHViIHN0cnVjdCBNZXRhZGF0YSB7CiAgICBwdWIgdW5pdF9kZW5vbTogU3RyaW5nLAogICAgcHViIHByaWNlOiBVaW50MTI4LAogICAgcHViIG5hbWU6IE9wdGlvbjxTdHJpbmc+LAogICAgcHViIGZyZWlnaHRzOiBWZWM8RnJlaWdodD4sCiAgICBwdWIgaGVhbHRoOiBVaW50MTI4LAogICAgcHViIGZ1ZWw6IFVpbnQxMjgsCn0KCnB1YiBjb25zdCBTVEFURTogSXRlbTxTdGF0ZT4gPSBJdGVtOjpuZXcoInN0YXRlIik7","msg.rs":"dXNlIGNyYXRlOjpzdGF0ZTo6RXh0ZW5zaW9uOwp1c2UgY3JhdGU6OkNvbnRyYWN0RXJyb3I7CnVzZSBjb3Ntd2FzbV9zdGQ6OntCaW5hcnksIFVpbnQxMjh9Owp1c2UgY3c3MjFfYmFzZTo6RXhlY3V0ZU1zZyBhcyBDdzcyMUV4ZWN1dGVNc2c7CnVzZSBjdzcyMV9iYXNlOjpNaW50TXNnOwp1c2UgY3dfdXRpbHM6OkV4cGlyYXRpb247CnVzZSBzY2hlbWFyczo6SnNvblNjaGVtYTsKdXNlIHNlcmRlOjp7RGVzZXJpYWxpemUsIFNlcmlhbGl6ZX07CnVzZSBzdGQ6OmNvbnZlcnQ6OlRyeUZyb207CgojW2Rlcml2ZShTZXJpYWxpemUsIERlc2VyaWFsaXplLCBDbG9uZSwgUGFydGlhbEVxLCBKc29uU2NoZW1hLCBEZWJ1ZyldCiNbc2VyZGUocmVuYW1lX2FsbCA9ICJzbmFrZV9jYXNlIildCnB1YiBlbnVtIEV4ZWN1dGVNc2cgewogICAgVHJhbnNmZXJOZnQgewogICAgICAgIHJlY2lwaWVudDogU3RyaW5nLAogICAgICAgIHRva2VuX2lkOiBTdHJpbmcsCiAgICB9LAogICAgU2VuZE5mdCB7CiAgICAgICAgY29udHJhY3Q6IFN0cmluZywKICAgICAgICB0b2tlbl9pZDogU3RyaW5nLAogICAgICAgIG1zZzogQmluYXJ5LAogICAgfSwKICAgIEFwcHJvdmUgewogICAgICAgIHNwZW5kZXI6IFN0cmluZywKICAgICAgICB0b2tlbl9pZDogU3RyaW5nLAogICAgICAgIGV4cGlyZXM6IE9wdGlvbjxFeHBpcmF0aW9uPiwKICAgIH0sCiAgICBSZXZva2UgewogICAgICAgIHNwZW5kZXI6IFN0cmluZywKICAgICAgICB0b2tlbl9pZDogU3RyaW5nLAogICAgfSwKICAgIEFwcHJvdmVBbGwgewogICAgICAgIG9wZXJhdG9yOiBTdHJpbmcsCiAgICAgICAgZXhwaXJlczogT3B0aW9uPEV4cGlyYXRpb24+LAogICAgfSwKICAgIFJldm9rZUFsbCB7CiAgICAgICAgb3BlcmF0b3I6IFN0cmluZywKICAgIH0sCgogICAgTWludChNaW50TXNnPEV4dGVuc2lvbj4pLAoKICAgIEJ1cm4gewogICAgICAgIHRva2VuX2lkOiBTdHJpbmcsCiAgICB9LAoKICAgIFNldE1pbnRlciB7CiAgICAgICAgbWludGVyOiBTdHJpbmcsCiAgICB9LAoKICAgIExvYWRGcmVpZ2h0IHsKICAgICAgICB0b2tlbl9pZDogU3RyaW5nLAogICAgICAgIGRlbm9tOiBTdHJpbmcsCiAgICAgICAgYW1vdW50OiBVaW50MTI4LAogICAgICAgIHVuaXRfd2VpZ2h0OiBVaW50MTI4LAogICAgfSwKCiAgICBGdWVsVXAgewogICAgICAgIHRva2VuX2lkOiBTdHJpbmcsCiAgICAgICAgYW1vdW50OiBVaW50MTI4LAogICAgfSwKCiAgICBCdXJuRnVlbCB7CiAgICAgICAgdG9rZW5faWQ6IFN0cmluZywKICAgICAgICBhbW91bnQ6IFVpbnQxMjgsCiAgICB9LAoKICAgIFVubG9hZEZyZWlnaHQgewogICAgICAgIHRva2VuX2lkOiBTdHJpbmcsCiAgICAgICAgZGVub206IFN0cmluZywKICAgICAgICBhbW91bnQ6IFVpbnQxMjgsCiAgICB9LAogICAgRGVjcmVhc2VIZWFsdGggewogICAgICAgIHRva2VuX2lkOiBTdHJpbmcsCiAgICAgICAgdmFsdWU6IFVpbnQxMjgsCiAgICB9LAp9CgppbXBsIFRyeUZyb208RXhlY3V0ZU1zZz4gZm9yIEN3NzIxRXhlY3V0ZU1zZzxFeHRlbnNpb24+IHsKICAgIHR5cGUgRXJyb3IgPSBDb250cmFjdEVycm9yOwoKICAgIGZuIHRyeV9mcm9tKG1zZzogRXhlY3V0ZU1zZykgLT4gUmVzdWx0PFNlbGYsIFNlbGY6OkVycm9yPiB7CiAgICAgICAgbWF0Y2ggbXNnIHsKICAgICAgICAgICAgRXhlY3V0ZU1zZzo6VHJhbnNmZXJOZnQgewogICAgICAgICAgICAgICAgcmVjaXBpZW50LAogICAgICAgICAgICAgICAgdG9rZW5faWQsCiAgICAgICAgICAgIH0gPT4gT2soQ3c3MjFFeGVjdXRlTXNnOjpUcmFuc2Zlck5mdCB7CiAgICAgICAgICAgICAgICByZWNpcGllbnQsCiAgICAgICAgICAgICAgICB0b2tlbl9pZCwKICAgICAgICAgICAgfSksCiAgICAgICAgICAgIEV4ZWN1dGVNc2c6Ok1pbnQobWludF9tc2cpID0+IE9rKEN3NzIxRXhlY3V0ZU1zZzo6TWludChtaW50X21zZykpLAogICAgICAgICAgICBFeGVjdXRlTXNnOjpTZW5kTmZ0IHsKICAgICAgICAgICAgICAgIGNvbnRyYWN0LAogICAgICAgICAgICAgICAgdG9rZW5faWQsCiAgICAgICAgICAgICAgICBtc2csCiAgICAgICAgICAgIH0gPT4gT2soQ3c3MjFFeGVjdXRlTXNnOjpTZW5kTmZ0IHsKICAgICAgICAgICAgICAgIGNvbnRyYWN0LAogICAgICAgICAgICAgICAgdG9rZW5faWQsCiAgICAgICAgICAgICAgICBtc2csCiAgICAgICAgICAgIH0pLAogICAgICAgICAgICBFeGVjdXRlTXNnOjpBcHByb3ZlIHsKICAgICAgICAgICAgICAgIHNwZW5kZXIsCiAgICAgICAgICAgICAgICB0b2tlbl9pZCwKICAgICAgICAgICAgICAgIGV4cGlyZXMsCiAgICAgICAgICAgIH0gPT4gT2soQ3c3MjFFeGVjdXRlTXNnOjpBcHByb3ZlIHsKICAgICAgICAgICAgICAgIHNwZW5kZXIsCiAgICAgICAgICAgICAgICB0b2tlbl9pZCwKICAgICAgICAgICAgICAgIGV4cGlyZXMsCiAgICAgICAgICAgIH0pLAogICAgICAgICAgICBFeGVjdXRlTXNnOjpSZXZva2UgeyBzcGVuZGVyLCB0b2tlbl9pZCB9ID0+IHsKICAgICAgICAgICAgICAgIE9rKEN3NzIxRXhlY3V0ZU1zZzo6UmV2b2tlIHsgc3BlbmRlciwgdG9rZW5faWQgfSkKICAgICAgICAgICAgfQogICAgICAgICAgICBFeGVjdXRlTXNnOjpCdXJuIHsgdG9rZW5faWQgfSA9PiBPayhDdzcyMUV4ZWN1dGVNc2c6OkJ1cm4geyB0b2tlbl9pZCB9KSwKICAgICAgICAgICAgRXhlY3V0ZU1zZzo6QXBwcm92ZUFsbCB7IG9wZXJhdG9yLCBleHBpcmVzIH0gPT4gewogICAgICAgICAgICAgICAgT2soQ3c3MjFFeGVjdXRlTXNnOjpBcHByb3ZlQWxsIHsgb3BlcmF0b3IsIGV4cGlyZXMgfSkKICAgICAgICAgICAgfQogICAgICAgICAgICBFeGVjdXRlTXNnOjpSZXZva2VBbGwgeyBvcGVyYXRvciB9ID0+IE9rKEN3NzIxRXhlY3V0ZU1zZzo6UmV2b2tlQWxsIHsgb3BlcmF0b3IgfSksCiAgICAgICAgICAgIF8gPT4gRXJyKENvbnRyYWN0RXJyb3I6OlVuaW1wbGVtZW50ZWQge30pLAogICAgICAgIH0KICAgIH0KfQ==","contract.rs":"I1tjZmcobm90KGZlYXR1cmUgPSAibGlicmFyeSIpKV0KdXNlIGNvc213YXNtX3N0ZDo6ZW50cnlfcG9pbnQ7CnVzZSBjb3Ntd2FzbV9zdGQ6OnsKICAgIHRvX2JpbmFyeSwgQmluYXJ5LCBEZXBzLCBEZXBzTXV0LCBFbXB0eSwgRW52LCBNZXNzYWdlSW5mbywgUmVzcG9uc2UsIFN0ZFJlc3VsdCwKfTsKCnVzZSBjcmF0ZTo6ZXJyb3I6OkNvbnRyYWN0RXJyb3I7CnVzZSBjcmF0ZTo6ZXhlY3V0ZTo6QmFzZUV4ZWN1dGU7CnVzZSBjcmF0ZTo6bXNnOjpFeGVjdXRlTXNnOwp1c2UgY3JhdGU6OnN0YXRlOjpFeHRlbnNpb247CnVzZSBjcmF0ZTo6e2V4ZWN1dGUsIHF1ZXJ5fTsKCnVzZSBjdzI6OnNldF9jb250cmFjdF92ZXJzaW9uOwp1c2UgY3c3MjFfYmFzZTo6e0N3NzIxQ29udHJhY3QsIEluc3RhbnRpYXRlTXNnLCBRdWVyeU1zZ307Cgpjb25zdCBDT05UUkFDVF9OQU1FOiAmc3RyID0gImNyYXRlcy5pbzpjb3Ntb25hdXQtY3c3MjEiOwpjb25zdCBDT05UUkFDVF9WRVJTSU9OOiAmc3RyID0gZW52ISgiQ0FSR09fUEtHX1ZFUlNJT04iKTsKCiNbY2ZnX2F0dHIobm90KGZlYXR1cmUgPSAibGlicmFyeSIpLCBlbnRyeV9wb2ludCldCnB1YiBmbiBpbnN0YW50aWF0ZSgKICAgIGRlcHM6IERlcHNNdXQsCiAgICBlbnY6IEVudiwKICAgIGluZm86IE1lc3NhZ2VJbmZvLAogICAgbXNnOiBJbnN0YW50aWF0ZU1zZywKKSAtPiBTdGRSZXN1bHQ8UmVzcG9uc2U+IHsKICAgIHNldF9jb250cmFjdF92ZXJzaW9uKGRlcHMuc3RvcmFnZSwgQ09OVFJBQ1RfTkFNRSwgQ09OVFJBQ1RfVkVSU0lPTik/OwogICAgbGV0IGN3NzIxX2NvbnRyYWN0ID0gQ3c3MjFDb250cmFjdDo6PEV4dGVuc2lvbiwgRW1wdHk+OjpkZWZhdWx0KCk7CiAgICBjdzcyMV9jb250cmFjdC5pbnN0YW50aWF0ZShkZXBzLCBlbnYsIGluZm8uY2xvbmUoKSwgbXNnKT87CiAgICBPayhSZXNwb25zZTo6bmV3KCkKICAgICAgICAuYWRkX2F0dHJpYnV0ZSgiYWN0aW9uIiwgImluc3RhbnRpYXRlIikKICAgICAgICAuYWRkX2F0dHJpYnV0ZSgic2VuZGVyIiwgaW5mby5zZW5kZXIudG9fc3RyaW5nKCkpKQp9CgojW2NmZ19hdHRyKG5vdChmZWF0dXJlID0gImxpYnJhcnkiKSwgZW50cnlfcG9pbnQpXQpwdWIgZm4gZXhlY3V0ZSgKICAgIGRlcHM6IERlcHNNdXQsCiAgICBlbnY6IEVudiwKICAgIGluZm86IE1lc3NhZ2VJbmZvLAogICAgbXNnOiBFeGVjdXRlTXNnLAopIC0+IFJlc3VsdDxSZXNwb25zZSwgQ29udHJhY3RFcnJvcj4gewogICAgbGV0IGNvc21vbmF1dF9jb250cmFjdCA9IEN3NzIxQ29udHJhY3Q6OmRlZmF1bHQoKTsKCiAgICBtYXRjaCBtc2cgewogICAgICAgIEV4ZWN1dGVNc2c6OlNldE1pbnRlciB7IG1pbnRlciB9ID0+IGV4ZWN1dGU6OnNldF9taW50ZXIoZGVwcywgaW5mbywgbWludGVyKSwKICAgICAgICAvLyBtc2cgdG8gbG9hZCBjdzIwLWhlbHBlciB0b2tlbiBkYXRhIG9uIG5mdAogICAgICAgIEV4ZWN1dGVNc2c6OkxvYWRGcmVpZ2h0IHsKICAgICAgICAgICAgdG9rZW5faWQsCiAgICAgICAgICAgIGRlbm9tLAogICAgICAgICAgICBhbW91bnQsCiAgICAgICAgICAgIHVuaXRfd2VpZ2h0LAogICAgICAgIH0gPT4gZXhlY3V0ZTo6bG9hZF9mcmVpZ2h0KGRlcHMsIHRva2VuX2lkLCBkZW5vbSwgYW1vdW50LCB1bml0X3dlaWdodCksCiAgICAgICAgLy8gbXNnIHRvIHVubG9hZCBjdzIwLWhlbHBlciB0b2tlbiBkYXRhIG9uIG5mdAogICAgICAgIEV4ZWN1dGVNc2c6OlVubG9hZEZyZWlnaHQgewogICAgICAgICAgICB0b2tlbl9pZCwKICAgICAgICAgICAgZGVub20sCiAgICAgICAgICAgIGFtb3VudCwKICAgICAgICB9ID0+IGV4ZWN1dGU6OnVubG9hZF9mcmVpZ2h0KGRlcHMsIHRva2VuX2lkLCBkZW5vbSwgYW1vdW50KSwKICAgICAgICAvLyBtc2cgdG8gZGVjcmVhc2UgaGVhbHRoIHdoZW4gcGxheWluZyBnYW1lcwogICAgICAgIEV4ZWN1dGVNc2c6OkRlY3JlYXNlSGVhbHRoIHsgdG9rZW5faWQsIHZhbHVlIH0gPT4gewogICAgICAgICAgICBleGVjdXRlOjpkZWNyZWFzZV9oZWFsdGgoZGVwcywgaW5mbywgZW52LCB0b2tlbl9pZCwgdmFsdWUpCiAgICAgICAgfQogICAgICAgIEV4ZWN1dGVNc2c6OkZ1ZWxVcCB7IHRva2VuX2lkLCBhbW91bnQgfSA9PiBleGVjdXRlOjpmdWVsX3VwKGRlcHMsIGluZm8sIHRva2VuX2lkLCBhbW91bnQpLAogICAgICAgIEV4ZWN1dGVNc2c6OkJ1cm5GdWVsIHsgdG9rZW5faWQsIGFtb3VudCB9ID0+IHsKICAgICAgICAgICAgZXhlY3V0ZTo6YnVybl9mdWVsKGRlcHMsIGluZm8sIHRva2VuX2lkLCBhbW91bnQpCiAgICAgICAgfQogICAgICAgIF8gPT4gY29zbW9uYXV0X2NvbnRyYWN0LmJhc2VfZXhlY3V0ZShkZXBzLCBlbnYsIGluZm8sIG1zZyksCiAgICB9Cn0KCiNbY2ZnX2F0dHIobm90KGZlYXR1cmUgPSAibGlicmFyeSIpLCBlbnRyeV9wb2ludCldCnB1YiBmbiBxdWVyeShkZXBzOiBEZXBzLCBlbnY6IEVudiwgbXNnOiBRdWVyeU1zZykgLT4gU3RkUmVzdWx0PEJpbmFyeT4gewogICAgbWF0Y2ggbXNnIHsKICAgICAgICBRdWVyeU1zZzo6TWludGVyIHt9ID0+IHRvX2JpbmFyeSgmcXVlcnk6Om1pbnRlcihkZXBzKT8pLAogICAgICAgIFF1ZXJ5TXNnOjpPd25lck9mIHsKICAgICAgICAgICAgdG9rZW5faWQsCiAgICAgICAgICAgIGluY2x1ZGVfZXhwaXJlZCwKICAgICAgICB9ID0+IHRvX2JpbmFyeSgmcXVlcnk6Om93bmVyX29mKAogICAgICAgICAgICBkZXBzLAogICAgICAgICAgICBlbnYsCiAgICAgICAgICAgIHRva2VuX2lkLAogICAgICAgICAgICBpbmNsdWRlX2V4cGlyZWQudW53cmFwX29yKGZhbHNlKSwKICAgICAgICApPyksCiAgICAgICAgUXVlcnlNc2c6OkFwcHJvdmFsIHsKICAgICAgICAgICAgdG9rZW5faWQsCiAgICAgICAgICAgIHNwZW5kZXIsCiAgICAgICAgICAgIGluY2x1ZGVfZXhwaXJlZCwKICAgICAgICB9ID0+IHRvX2JpbmFyeSgmcXVlcnk6OmFwcHJvdmFsKAogICAgICAgICAgICBkZXBzLAogICAgICAgICAgICBlbnYsCiAgICAgICAgICAgIHRva2VuX2lkLAogICAgICAgICAgICBzcGVuZGVyLAogICAgICAgICAgICBpbmNsdWRlX2V4cGlyZWQudW53cmFwX29yKGZhbHNlKSwKICAgICAgICApPyksCiAgICAgICAgUXVlcnlNc2c6OkFwcHJvdmFscyB7CiAgICAgICAgICAgIHRva2VuX2lkLAogICAgICAgICAgICBpbmNsdWRlX2V4cGlyZWQsCiAgICAgICAgfSA9PiB0b19iaW5hcnkoJnF1ZXJ5OjphcHByb3ZlZF9mb3JfYWxsKAogICAgICAgICAgICBkZXBzLAogICAgICAgICAgICBlbnYsCiAgICAgICAgICAgIHRva2VuX2lkLAogICAgICAgICAgICBpbmNsdWRlX2V4cGlyZWQudW53cmFwX29yKGZhbHNlKSwKICAgICAgICApPyksCiAgICAgICAgUXVlcnlNc2c6Ok5mdEluZm8geyB0b2tlbl9pZCB9ID0+IHRvX2JpbmFyeSgmcXVlcnk6Om5mdF9pbmZvKGRlcHMsIHRva2VuX2lkKT8pLAogICAgICAgIFF1ZXJ5TXNnOjpBbGxOZnRJbmZvIHsKICAgICAgICAgICAgdG9rZW5faWQsCiAgICAgICAgICAgIGluY2x1ZGVfZXhwaXJlZCwKICAgICAgICB9ID0+IHRvX2JpbmFyeSgmcXVlcnk6OmFsbF9uZnRfaW5mbygKICAgICAgICAgICAgZGVwcywKICAgICAgICAgICAgZW52LAogICAgICAgICAgICB0b2tlbl9pZCwKICAgICAgICAgICAgaW5jbHVkZV9leHBpcmVkLnVud3JhcF9vcl9kZWZhdWx0KCksCiAgICAgICAgKT8pLAogICAgICAgIFF1ZXJ5TXNnOjpOdW1Ub2tlbnMge30gPT4gdG9fYmluYXJ5KCZxdWVyeTo6bnVtX3Rva2VucyhkZXBzKT8pLAogICAgICAgIFF1ZXJ5TXNnOjpUb2tlbnMgewogICAgICAgICAgICBvd25lciwKICAgICAgICAgICAgc3RhcnRfYWZ0ZXIsCiAgICAgICAgICAgIGxpbWl0LAogICAgICAgIH0gPT4gdG9fYmluYXJ5KCZxdWVyeTo6dG9rZW5zKGRlcHMsIG93bmVyLCBzdGFydF9hZnRlciwgbGltaXQpPyksCiAgICAgICAgUXVlcnlNc2c6OkNvbnRyYWN0SW5mbyB7fSA9PiB0b19iaW5hcnkoJnF1ZXJ5Ojpjb250cmFjdF9pbmZvKGRlcHMpPyksCgogICAgICAgIF8gPT4gU3RkUmVzdWx0OjpPayhEZWZhdWx0OjpkZWZhdWx0KCkpLAogICAgfQ==","execute.rs":"dXNlIGNyYXRlOjptc2c6OkV4ZWN1dGVNc2c7CnVzZSBjcmF0ZTo6c3RhdGU6OntFeHRlbnNpb24sIEZyZWlnaHR9Owp1c2UgY3JhdGU6OkNvbnRyYWN0RXJyb3I7CnVzZSBjb3Ntd2FzbV9zdGQ6OnsKICAgIGF0dHIsIEFkZHIsIERlcHMsIERlcHNNdXQsIEVtcHR5LCBFbnYsIE1lc3NhZ2VJbmZvLCBSZXNwb25zZSwgU3RkRXJyb3IsIFVpbnQxMjgsCn07Cgp1c2UgY3c3MjFfYmFzZTo6c3RhdGU6OlRva2VuSW5mbzsKdXNlIGN3NzIxX2Jhc2U6OkN3NzIxQ29udHJhY3Q7CnVzZSBzdGQ6OmNvbnZlcnQ6OntUcnlGcm9tLCBUcnlJbnRvfTsKCnB1YiB0cmFpdCBCYXNlRXhlY3V0ZSB7CiAgICBmbiBiYXNlX2V4ZWN1dGUoCiAgICAgICAgJnNlbGYsCiAgICAgICAgZGVwczogRGVwc011dCwKICAgICAgICBlbnY6IEVudiwKICAgICAgICBpbmZvOiBNZXNzYWdlSW5mbywKICAgICAgICBtc2c6IEV4ZWN1dGVNc2csCiAgICApIC0+IFJlc3VsdDxSZXNwb25zZSwgQ29udHJhY3RFcnJvcj47Cn0KCmltcGw8J2E+IEJhc2VFeGVjdXRlIGZvciBDdzcyMUNvbnRyYWN0PCdhLCBFeHRlbnNpb24sIEVtcHR5PiB7CiAgICBmbiBiYXNlX2V4ZWN1dGUoCiAgICAgICAgJnNlbGYsCiAgICAgICAgZGVwczogRGVwc011dCwKICAgICAgICBlbnY6IEVudiwKICAgICAgICBpbmZvOiBNZXNzYWdlSW5mbywKICAgICAgICBtc2c6IEV4ZWN1dGVNc2csCiAgICApIC0+IFJlc3VsdDxSZXNwb25zZSwgQ29udHJhY3RFcnJvcj4gewogICAgICAgIGxldCBjdzcyMV9tc2cgPSBtc2cudHJ5X2ludG8oKT87CiAgICAgICAgbGV0IGV4ZWN1dGVfcmVzID0gc2VsZi5leGVjdXRlKGRlcHMsIGVudiwgaW5mbywgY3c3MjFfbXNnKTsKICAgICAgICBtYXRjaCBleGVjdXRlX3JlcyB7CiAgICAgICAgICAgIE9rKHJlcykgPT4gT2socmVzKSwKICAgICAgICAgICAgRXJyKGVycikgPT4gRXJyKENvbnRyYWN0RXJyb3I6OnRyeV9mcm9tKGVycik/KSwKICAgICAgICB9CiAgICB9Cn0KCmZuIGNoZWNrX2Nhbl9zZW5kKAogICAgY29udHJhY3Q6ICZDdzcyMUNvbnRyYWN0PEV4dGVuc2lvbiwgRW1wdHk+LAogICAgZGVwczogRGVwcywKICAgIGVudjogJkVudiwKICAgIHNlbmRlcjogJkFkZHIsCiAgICB0b2tlbjogJlRva2VuSW5mbzxFeHRlbnNpb24+LAopIC0+IFJlc3VsdDwoKSwgQ29udHJhY3RFcnJvcj4gewogICAgaWYgdG9rZW4ub3duZXIgPT0gc2VuZGVyLmFzX3JlZigpIHsKICAgICAgICByZXR1cm4gT2soKCkpOwogICAgfQoKICAgIGlmIHRva2VuCiAgICAgICAgLmFwcHJvdmFscwogICAgICAgIC5pdGVyKCkKICAgICAgICAuYW55KHxhcHByb3ZhbHwgYXBwcm92YWwuc3BlbmRlciA9PSBzZW5kZXIuYXNfcmVmKCkgJiYgIWFwcHJvdmFsLmlzX2V4cGlyZWQoJmVudi5ibG9jaykpCiAgICB7CiAgICAgICAgcmV0dXJuIE9rKCgpKTsKICAgIH0KCiAgICBsZXQgb3BlcmF0b3JzID0gY29udHJhY3QKICAgICAgICAub3BlcmF0b3JzCiAgICAgICAgLm1heV9sb2FkKGRlcHMuc3RvcmFnZSwgKCZ0b2tlbi5vd25lciwgc2VuZGVyKSk/OwoKICAgIG1hdGNoIG9wZXJhdG9ycyB7CiAgICAgICAgU29tZShleHBpcmF0aW9uKSA9PiB7CiAgICAgICAgICAgIGlmIGV4cGlyYXRpb24uaXNfZXhwaXJlZCgmZW52LmJsb2NrKSB7CiAgICAgICAgICAgICAgICBFcnIoQ29udHJhY3RFcnJvcjo6VW5hdXRob3JpemVkIHt9KQogICAgICAgICAgICB9IGVsc2UgewogICAgICAgICAgICAgICAgT2soKCkpCiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgTm9uZSA9PiBFcnIoQ29udHJhY3RFcnJvcjo6VW5hdXRob3JpemVkIHt9KSwKICAgIH0KfQoKcHViIGZuIHNldF9taW50ZXIoCiAgICBkZXBzOiBEZXBzTXV0LAogICAgaW5mbzogTWVzc2FnZUluZm8sCiAgICBtaW50ZXI6IFN0cmluZywKKSAtPiBSZXN1bHQ8UmVzcG9uc2UsIENvbnRyYWN0RXJyb3I+IHsKICAgIGxldCBtaW50ZXJfYWRkciA9IGRlcHMuYXBpLmFkZHJfdmFsaWRhdGUoJm1pbnRlcik/OwogICAgbGV0IGNvc21vbmF1dF9jb250cmFjdDogQ3c3MjFDb250cmFjdDxFeHRlbnNpb24sIEVtcHR5PiA9IEN3NzIxQ29udHJhY3Q6OmRlZmF1bHQoKTsKCiAgICBpZiBjb3Ntb25hdXRfY29udHJhY3QubWludGVyKGRlcHMuYXNfcmVmKCkpPy5taW50ZXIgPT0gaW5mby5zZW5kZXIgewogICAgICAgIGNvc21vbmF1dF9jb250cmFjdC5taW50ZXIuc2F2ZShkZXBzLnN0b3JhZ2UsICZtaW50ZXJfYWRkcik/OwogICAgfSBlbHNlIHsKICAgICAgICByZXR1cm4gRXJyKENvbnRyYWN0RXJyb3I6OlVuYXV0aG9yaXplZCB7fSk7CiAgICB9CgogICAgT2soUmVzcG9uc2U6Om5ldygpCiAgICAgICAgLmFkZF9hdHRyaWJ1dGUoImFjdGlvbiIsICJzZXRfbWludGVyIikKICAgICAgICAuYWRkX2F0dHJpYnV0ZSgic2VuZGVyIiwgaW5mby5zZW5kZXIudG9fc3RyaW5nKCkpCiAgICAgICAgLmFkZF9hdHRyaWJ1dGUoIm1pbnRlciIsIG1pbnRlcikpCn0KCnB1YiBmbiBsb2FkX2ZyZWlnaHQoCiAgICBkZXBzOiBEZXBzTXV0LAogICAgdG9rZW5faWQ6IFN0cmluZywKICAgIGRlbm9tOiBTdHJpbmcsCiAgICBhbW91bnQ6IFVpbnQxMjgsCiAgICB1bml0X3dlaWdodDogVWludDEyOCwKKSAtPiBSZXN1bHQ8UmVzcG9uc2UsIENvbnRyYWN0RXJyb3I+IHsKICAgIGxldCBjb250cmFjdDogQ3c3MjFDb250cmFjdDxFeHRlbnNpb24sIEVtcHR5PiA9IEN3NzIxQ29udHJhY3Q6OmRlZmF1bHQoKTsKICAgIGxldCBtdXQgdG9rZW4gPSBjb250cmFjdC50b2tlbnMubG9hZChkZXBzLnN0b3JhZ2UsICZ0b2tlbl9pZCk/OwogICAgbGV0IG11dCBleHRlbnNpb24gPSB0b2tlbi5leHRlbnNpb247CgogICAgLy8gaXRlcmF0ZSBmcmVpZ2h0IHRvIGZpbmQgdGFyZ2V0IGN3MjAtaGVscGVyIGJ5IGRlbm9tCiAgICBsZXQgY2FuZGlkYXRlX2lkeCA9IGV4dGVuc2lvbi5mcmVpZ2h0cy5pdGVyKCkucG9zaXRpb24ofGx8IGwuZGVub20gPT0gZGVub20pOwogICAgLy8gaWYgdGhlcmUgaXMgdG9rZW4gd2l0aCBnaXZlbiBkZW5vbQogICAgaWYgbGV0IFNvbWUoaWR4KSA9IGNhbmRpZGF0ZV9pZHggewogICAgICAgIC8vIHVwZGF0ZSB0b2tlbiBhbW91bnQKICAgICAgICBleHRlbnNpb24uZnJlaWdodHNbaWR4XS5hbW91bnQgPQogICAgICAgICAgICBleHRlbnNpb24uZnJlaWdodHNbaWR4XS5hbW91bnQuY2hlY2tlZF9hZGQoYW1vdW50KS51bndyYXAoKTsKICAgIH0gZWxzZSB7CiAgICAgICAgLy8gaWYgbm90LCBwdXNoIGEgbmV3IGZyZWlnaHQgZGF0YQogICAgICAgIGV4dGVuc2lvbi5mcmVpZ2h0cy5wdXNoKEZyZWlnaHQgewogICAgICAgICAgICBkZW5vbTogZGVub20uY2xvbmUoKSwKICAgICAgICAgICAgYW1vdW50LAogICAgICAgICAgICB1bml0X3dlaWdodCwKICAgICAgICB9KQogICAgfQoKICAgIHRva2VuLmV4dGVuc2lvbiA9IGV4dGVuc2lvbjsKICAgIGNvbnRyYWN0LnRva2Vucy5zYXZlKGRlcHMuc3RvcmFnZSwgJnRva2VuX2lkLCAmdG9rZW4pPzsKCiAgICBPayhSZXNwb25zZTo6bmV3KCkKICAgICAgICAuYWRkX2F0dHJpYnV0ZSgiYWN0aW9uIiwgImxvYWRfZnJlaWdodCIpCiAgICAgICAgLmFkZF9hdHRyaWJ1dGUoInRva2VuX2lkIiwgdG9rZW5faWQpCiAgICAgICAgLmFkZF9hdHRyaWJ1dGUoImZyZWlnaHQiLCBkZW5vbSkKICAgICAgICAuYWRkX2F0dHJpYnV0ZSgiYW1vdW50IiwgYW1vdW50LnRvX3N0cmluZygpKQogICAgICAgIC5hZGRfYXR0cmlidXRlKCJ1bml0X3dlaWdodCIsIHVuaXRfd2VpZ2h0LnRvX3N0cmluZygpKSkKfQoKcHViIGZuIHVubG9hZF9mcmVpZ2h0KAogICAgZGVwczogRGVwc011dCwKICAgIHRva2VuX2lkOiBTdHJpbmcsCiAgICBkZW5vbTogU3RyaW5nLAogICAgYW1vdW50OiBVaW50MTI4LAopIC0+IFJlc3VsdDxSZXNwb25zZSwgQ29udHJhY3RFcnJvcj4gewogICAgbGV0IGNvbnRyYWN0OiBDdzcyMUNvbnRyYWN0PEV4dGVuc2lvbiwgRW1wdHk+ID0gQ3c3MjFDb250cmFjdDo6ZGVmYXVsdCgpOwogICAgbGV0IG11dCB0b2tlbiA9IGNvbnRyYWN0LnRva2Vucy5sb2FkKGRlcHMuc3RvcmFnZSwgJnRva2VuX2lkKT87CiAgICBsZXQgbXV0IGV4dGVuc2lvbiA9IHRva2VuLmV4dGVuc2lvbjsKCiAgICBsZXQgY2FuZGlkYXRlX2lkeCA9IGV4dGVuc2lvbi5mcmVpZ2h0cy5pdGVyKCkucG9zaXRpb24ofGx8IGwuZGVub20gPT0gZGVub20pOwogICAgaWYgbGV0IFNvbWUoaWR4KSA9IGNhbmRpZGF0ZV9pZHggewogICAgICAgIGlmIGV4dGVuc2lvbi5mcmVpZ2h0c1tpZHhdLmFtb3VudC51MTI4KCkgLSBhbW91bnQudTEyOCgpID09IDAgewogICAgICAgICAgICBleHRlbnNpb24uZnJlaWdodHMucmVtb3ZlKGlkeCk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgZXh0ZW5zaW9uLmZyZWlnaHRzW2lkeF0uYW1vdW50ID0KICAgICAgICAgICAgICAgIGV4dGVuc2lvbi5mcmVpZ2h0c1tpZHhdLmFtb3VudC5jaGVja2VkX3N1YihhbW91bnQpLnVud3JhcCgpOwogICAgICAgIH0KICAgIH0gZWxzZSB7CiAgICAgICAgcmV0dXJuIEVycihDb250cmFjdEVycm9yOjpOb3RGb3VuZCB7fSk7CiAgICB9CiAgICB0b2tlbi5leHRlbnNpb24gPSBleHRlbnNpb247CiAgICBjb250cmFjdC50b2tlbnMuc2F2ZShkZXBzLnN0b3JhZ2UsICZ0b2tlbl9pZCwgJnRva2VuKT87CgogICAgT2soUmVzcG9uc2U6Om5ldygpCiAgICAgICAgLmFkZF9hdHRyaWJ1dGUoImFjdGlvbiIsICJ1bmxvYWRfbHVnYWdnZSIpCiAgICAgICAgLmFkZF9hdHRyaWJ1dGUoInRva2VuX2lkIiwgdG9rZW5faWQpCiAgICAgICAgLmFkZF9hdHRyaWJ1dGUoImZyZWlnaHQiLCBkZW5vbSkKICAgICAgICAuYWRkX2F0dHJpYnV0ZSgiYW1vdW50IiwgYW1vdW50LnRvX3N0cmluZygpKSkKfQoKcHViIGZuIGRlY3JlYXNlX2hlYWx0aCgKICAgIGRlcHM6IERlcHNNdXQsCiAgICBpbmZvOiBNZXNzYWdlSW5mbywKICAgIGVudjogRW52LAogICAgdG9rZW5faWQ6IFN0cmluZywKICAgIHZhbHVlOiBVaW50MTI4LAopIC0+IFJlc3VsdDxSZXNwb25zZSwgQ29udHJhY3RFcnJvcj4gewogICAgbGV0IGNvc21vbmF1dF9jb250cmFjdDogQ3c3MjFDb250cmFjdDxFeHRlbnNpb24sIEVtcHR5PiA9IEN3NzIxQ29udHJhY3Q6OmRlZmF1bHQoKTsKICAgIGxldCBtdXQgdG9rZW4gPSBjb3Ntb25hdXRfY29udHJhY3QudG9rZW5zLmxvYWQoZGVwcy5zdG9yYWdlLCAmdG9rZW5faWQpPzsKCiAgICBjaGVja19jYW5fc2VuZCgKICAgICAgICAmY29zbW9uYXV0X2NvbnRyYWN0LAogICAgICAgIGRlcHMuYXNfcmVmKCksCiAgICAgICAgJmVudiwKICAgICAgICAmaW5mby5zZW5kZXIsCiAgICAgICAgJnRva2VuLAogICAgKT87CiAgICBsZXQgbXV0IGV4dGVuc2lvbiA9IHRva2VuLmV4dGVuc2lvbjsKCiAgICAvLyBoYW5kbGUgd2l0aCBuZWdhdGl2ZSBvdmVyZmxvdwogICAgZXh0ZW5zaW9uLmhlYWx0aCA9IGV4dGVuc2lvbi5oZWFsdGguc2F0dXJhdGluZ19zdWIodmFsdWUpOwogICAgdG9rZW4uZXh0ZW5zaW9uID0gZXh0ZW5zaW9uOwogICAgY29zbW9uYXV0X2NvbnRyYWN0CiAgICAgICAgLnRva2VucwogICAgICAgIC5zYXZlKGRlcHMuc3RvcmFnZSwgJnRva2VuX2lkLCAmdG9rZW4pPzsKCiAgICBPayhSZXNwb25zZTo6bmV3KCkKICAgICAgICAuYWRkX2F0dHJpYnV0ZSgiYWN0aW9uIiwgImRlY3JlYXNlX2hlYWx0aCIpCiAgICAgICAgLmFkZF9hdHRyaWJ1dGUoInNlbmRlciIsIGluZm8uc2VuZGVyLnRvX3N0cmluZygpKQogICAgICAgIC5hZGRfYXR0cmlidXRlKCJ0b2tlbl9pZCIsIHRva2VuX2lkLnRvX3N0cmluZygpKQogICAgICAgIC5hZGRfYXR0cmlidXRlKCJ2YWx1ZSIsIHZhbHVlLnRvX3N0cmluZygpKSkKfQoKcHViIGZuIGZ1ZWxfdXAoCiAgICBkZXBzOiBEZXBzTXV0LAogICAgaW5mbzogTWVzc2FnZUluZm8sCiAgICB0b2tlbl9pZDogU3RyaW5nLAogICAgYW1vdW50OiBVaW50MTI4LAopIC0+IFJlc3VsdDxSZXNwb25zZSwgQ29udHJhY3RFcnJvcj4gewogICAgbGV0IGNvbnRyYWN0OiBDdzcyMUNvbnRyYWN0PEV4dGVuc2lvbiwgRW1wdHk+ID0gQ3c3MjFDb250cmFjdDo6ZGVmYXVsdCgpOwoKICAgIGlmIGluZm8uc2VuZGVyICE9IGNvbnRyYWN0Lm1pbnRlci5sb2FkKGRlcHMuc3RvcmFnZSk/IHsKICAgICAgICByZXR1cm4gRXJyKENvbnRyYWN0RXJyb3I6OlVuYXV0aG9yaXplZCB7fSk7CiAgICB9CgogICAgbGV0IG11dCB0b2tlbiA9IGNvbnRyYWN0LnRva2Vucy5sb2FkKGRlcHMuc3RvcmFnZSwgJnRva2VuX2lkKT87CiAgICBsZXQgbXV0IGV4dGVuc2lvbiA9IHRva2VuLmV4dGVuc2lvbjsKCiAgICBleHRlbnNpb24uZnVlbCA9IGV4dGVuc2lvbgogICAgICAgIC5mdWVsCiAgICAgICAgLmNoZWNrZWRfYWRkKGFtb3VudCkKICAgICAgICAubWFwX2VycihTdGRFcnJvcjo6b3ZlcmZsb3cpPzsKCiAgICB0b2tlbi5leHRlbnNpb24gPSBleHRlbnNpb247CiAgICBjb250cmFjdC50b2tlbnMuc2F2ZShkZXBzLnN0b3JhZ2UsICZ0b2tlbl9pZCwgJnRva2VuKT87CgogICAgT2soUmVzcG9uc2U6Om5ldygpLmFkZF9hdHRyaWJ1dGVzKFsKICAgICAgICBhdHRyKCJhY3Rpb24iLCAiZnVlbF91cCIpLAogICAgICAgIGF0dHIoInRvIiwgdG9rZW5faWQpLAogICAgICAgIGF0dHIoImFtb3VudCIsIGFtb3VudC50b19zdHJpbmcoKSksCiAgICBdKSkKfQoKcHViIGZuIGJ1cm5fZnVlbCgKICAgIGRlcHM6IERlcHNNdXQsCiAgICBpbmZvOiBNZXNzYWdlSW5mbywKICAgIHRva2VuX2lkOiBTdHJpbmcsCiAgICBhbW91bnQ6IFVpbnQxMjgsCikgLT4gUmVzdWx0PFJlc3BvbnNlLCBDb250cmFjdEVycm9yPiB7CiAgICBsZXQgY29udHJhY3Q6IEN3NzIxQ29udHJhY3Q8RXh0ZW5zaW9uLCBFbXB0eT4gPSBDdzcyMUNvbnRyYWN0OjpkZWZhdWx0KCk7CgogICAgaWYgaW5mby5zZW5kZXIgIT0gY29udHJhY3QubWludGVyLmxvYWQoZGVwcy5zdG9yYWdlKT8gewogICAgICAgIHJldHVybiBFcnIoQ29udHJhY3RFcnJvcjo6VW5hdXRob3JpemVkIHt9KTsKICAgIH0KCiAgICBsZXQgbXV0IHRva2VuID0gY29udHJhY3QudG9rZW5zLmxvYWQoZGVwcy5zdG9yYWdlLCAmdG9rZW5faWQpPzsKICAgIGxldCBtdXQgZXh0ZW5zaW9uID0gdG9rZW4uZXh0ZW5zaW9uOwoKICAgIGV4dGVuc2lvbi5mdWVsID0gZXh0ZW5zaW9uCiAgICAgICAgLmZ1ZWwKICAgICAgICAuY2hlY2tlZF9zdWIoYW1vdW50KQogICAgICAgIC5tYXBfZXJyKFN0ZEVycm9yOjpvdmVyZmxvdyk/OwoKICAgIHRva2VuLmV4dGVuc2lvbiA9IGV4dGVuc2lvbjsKICAgIGNvbnRyYWN0LnRva2Vucy5zYXZlKGRlcHMuc3RvcmFnZSwgJnRva2VuX2lkLCAmdG9rZW4pPzsKCiAgICBPayhSZXNwb25zZTo6bmV3KCkuYWRkX2F0dHJpYnV0ZXMoWwogICAgICAgIGF0dHIoImFjdGlvbiIsICJidXJuX2Z1ZWwiKSwKICAgICAgICBhdHRyKCJ0byIsIHRva2VuX2lkKSwKICAgICAgICBhdHRyKCJhbW91bnQiLCBhbW91bnQudG9fc3RyaW5nKCkpLAogICAgXSkpCn0="}