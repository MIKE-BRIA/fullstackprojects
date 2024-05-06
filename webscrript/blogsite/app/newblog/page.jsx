import styles from "./page.module.css";
import { shareBlog } from "@/lib/submitBlog";

export default function NewBlog() {
  return (
    <main className={styles.homepage}>
      <h1 className={styles.header}>New Blog</h1>
      <form action={shareBlog} className={styles.data}>
        <div className={styles.personal}>
          <p>
            <label htmlFor="name"> Your Name</label>
            <input type="text" id="name" name="name" />
          </p>
          <p>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" />
          </p>
        </div>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text " id="title" name="title" />
        </p>
        <p>
          <label htmlFor="summary">Summary</label>
          <input type="text" id="summary" name="summary" />
        </p>
        <p>
          <label htmlFor="blog">Blog</label>
          <textarea name="blog" id="blog" rows="9"></textarea>
        </p>
        <div className={styles.btns}>
          <button className={styles.btn}>cancel</button>
          <button className={styles.submit}>Submit</button>
        </div>
      </form>
    </main>
  );
}
