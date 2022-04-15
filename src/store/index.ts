import { Subject } from "subjecto";
import { useState, useEffect } from "react";

Subject.prototype.hook = function () {
  const [value, setValue] = useState(this.value);
  useEffect(() => this.subscribe(setValue).unsubscribe, []);
  return value;
};

const store = {
  page: new Subject<"home" | "uidl">("uidl"),
  router: {
    url: new Subject("", "router.history", [
      (v: string) => v,
      (v: string) => v,
    ])
  },
};

export default store;
