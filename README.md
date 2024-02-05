# Assignment: File Manager

## Things to keep in mind

1) When working with commands that require entering two arguments containing white spaces, it is necessary to enclose those paths (or filenames) in **double quotes** ("").

2) Compression/decompression requires a user to indicate paths including file names and extensions.
    ```bash
    compress ./file-name.txt ./file-name.txt.br
    ```

    ```bash
    decompress ./file-name.txt.br ./some-folder/file-name.txt
    ```
3) It is recommended to use integrated into VS Code terminal, or standard Windows CMD. For some reason, Git Bash doesn't work properly.

Thanks for understanding!
