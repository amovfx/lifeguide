from pathlib import Path

BOOKDIR = "/Users/andrewoseen/git/lifeguide/flaskapp/src/book/static/content"

def get_word_count():
    book_path = Path(BOOKDIR)
    md_files = book_path.rglob("*.md")

    count = 0
    for md_file in md_files:
        with open(md_file) as open_md_file:
            lines = open_md_file.readlines()
            line_word_count = map(lambda x: len(x.split(" ")), lines)
            file_word_count =  sum(line_word_count)
            count += file_word_count
            print(f"{md_file}, has {file_word_count} words")

    print(f"Project has {count} words.")


if __name__ == '__main__':
    get_word_count()
