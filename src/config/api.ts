import ky from "ky";

const prefixUrl = "https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5";

export const api = ky.create({
  prefixUrl,
});
