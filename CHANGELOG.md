# V0.2.1
## Fixes and improvements
* Fix: After an error when opening the database the current task is aborted and a new task is extracted from the task queue to continue the execution. Now the execution of pending tasks is stopped.
* Improvement: Some checks were deleted from *checkSupport* function.
* Improvement: More browser versions are now supported. Browser compatibility with IndexedDB 2.0 is not required.
* Improvement: Smaller library size. 


# V0.2.0
## New features
* **exists**: Checks for key existence    


# V0.1.0
## Features
* **set**: Stores data on browser storage.
* **get**: Retrieves data from browser storage.
* **remove**: Removes data from browser storage.
* **checkSupport**: Checks browser support.